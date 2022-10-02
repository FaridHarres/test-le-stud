const express = require("express");
const passport = require("passport");
const router = express.Router();

const ActivityObject = require("../models/activity");
const ProjectObject = require("../models/project");

const SERVER_ERROR = "SERVER_ERROR";

router.get("/", passport.authenticate("admin", { session: false }), async (req, res) => {
  try {
    const query = {};
    if (req.query.user) query.user = req.query.user;
    if (req.query.project) query.project = req.query.project;
    if (req.query.date) {
      if (req.query.date.startsWith("gte:")) {
        const date = new Date(parseInt(req.query.date.replace("gte:", "")));
        query.date = { $gte: date };
      } else {
        query.date = req.query.date;
      }
    }

    if (req.query.dateFrom) {
      const date = new Date(parseInt(req.query.dateFrom));
      query.date = { ...query.date, $gte: date };
    }
    if (req.query.dateTo) {
      const date = new Date(parseInt(req.query.dateTo));
      query.date = { ...query.date, $lte: date };
    }

    const data = await ActivityObject.find(query).sort("-created_at");
    return res.status(200).send({ ok: true, data });
  } catch (error) {
    capture(error);
    res.status(500).send({ ok: false, code: SERVER_ERROR, error });
  }
});

router.post("/", passport.authenticate("admin", { session: false }), async (req, res) => {
  try {
    const body = req.body;
    const project = await ProjectObject.findOneAndUpdate({ name: body.project }, { last_updated_at: new Date() }, { new: true });
    const query = { project: body.project, user: body.user, date: body.date };

    const data = await ActivityObject.findOneAndUpdate(query, body, { new: true, upsert: true });

    res.status(200).send({ ok: true, data });
  } catch (error) {
    capture(error);
    res.status(500).send({ ok: false, code: SERVER_ERROR, error });
  }
});

router.delete("/:id", passport.authenticate("admin", { session: false }), async (req, res) => {
  try {
    await ActivityObject.findByIdAndDelete(req.params.id);
    res.status(200).send({ ok: true, data: null });
  } catch (error) {
    capture(error);
    res.status(500).send({ ok: false, code: SERVER_ERROR, error });
  }
});

module.exports = router;
