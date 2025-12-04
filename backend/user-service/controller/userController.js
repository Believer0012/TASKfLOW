import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
import crypto from "crypto";
// Import initialized models (not the factory functions)
import { User, RefreshToken } from "../model/index.js";

// Register a new user
export const register = async (req, res) => {
    console.log("qsssssssss",req.body);
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({username:userName, email, password_hash: hashPassword });

        return res.status(201).json({
            id: newUser.id,
            userName: newUser.userName,
            email: newUser.email,
        });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Login route
 export const login =  async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Missing email or password" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const valid = await bcrypt.compare(password, existingUser.password_hash);
        if (!valid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // create access token
        const payload = { id: existingUser.id, email: existingUser.email };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET || "change-me", {
            expiresIn: "1h",
        });

        // create refresh token (random string)
        const refreshTokenValue = crypto.randomBytes(64).toString("hex");
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

        // store refresh token in DB
        await RefreshToken.create({ token: refreshTokenValue, userId: existingUser.id, expiresAt });

        // set HttpOnly cookie for refresh token
        res.cookie("refreshToken", refreshTokenValue, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            accessToken,
            user: { id: existingUser.id, username: existingUser.username, email: existingUser.email },
        });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Refresh token endpoint (rotate refresh tokens)
export  const refreshToken = async (req, res) => {
    try {
        const token = req.cookies && req.cookies.refreshToken;
        if (!token) return res.status(401).json({ message: "Refresh token missing" });

        const stored = await RefreshToken.findOne({ where: { token } });
        if (!stored || stored.revoked || new Date() > new Date(stored.expiresAt)) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        const user = await User.findByPk(stored.userId);
        if (!user) return res.status(401).json({ message: "Invalid refresh token" });

        // rotate refresh token: replace stored token with a new one
        const newRefresh = crypto.randomBytes(64).toString("hex");
        const newExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        stored.token = newRefresh;
        stored.expiresAt = newExpiresAt;
        await stored.save();

        const payload = { id: user.id, email: user.email };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET || "change-me", { expiresIn: "1h" });

        // set new refresh cookie
        res.cookie("refreshToken", newRefresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.json({ accessToken });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Logout - revoke refresh token and clear cookie
 export const logout =  async (req, res) => {
    try {
        const token = req.cookies && req.cookies.refreshToken;
        if (token) {
            await RefreshToken.destroy({ where: { token } });
        }
        res.clearCookie("refreshToken");
        return res.json({ message: "Logged out" });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};
