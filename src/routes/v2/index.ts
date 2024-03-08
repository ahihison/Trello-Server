
import { auth2Route } from "./auth2Route";
import express from "express";
const Router = express.Router();

Router.use("/auth2", auth2Route );
export const API_V2 = Router;