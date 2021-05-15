import * as functions from "firebase-functions";
import type { Application, NextFunction, Request, Response } from "express";
import type { HttpError } from "http-errors";
import createError = require('http-errors');
import path = require("path");
import express = require("express");
const app: Application = express();

app.set('views', path.join(__dirname, "..", 'views'));
app.set('view engine', 'pug');

app.get("/", (req: Request, res: Response) => {

  res.render("index", {
    title: "GitHub User Search"
  });
});

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

exports.app = functions.https.onRequest(app);
