import type { Request, Response } from "express";
import { pool } from "../config/db.js";

export const getProblemSet = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 100;
    const offset = (page - 1) * limit;
    const result = await pool.query(
      `SELECT
          problem_id,
          title,
          difficulty,
          acceptance,
          is_premium
       FROM problems
       ORDER BY problem_id ASC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching problems:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProblemById = async (req: Request, res: Response) => {
  try {
    const { problemSlug } = req.params;
    const result = await pool.query(
      `SELECT
          problem_id,
          title,
          difficulty,
          acceptance,
          is_premium,
          tags,
          likes,
          dislikes,
          companies,
          submission_count,
          upvotes,
          downvotes,
          is_verified
       FROM problems
       WHERE slug = $1`,
      [problemSlug]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching problem:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
