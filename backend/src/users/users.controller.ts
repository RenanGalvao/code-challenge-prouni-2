import { Request, Response, NextFunction } from 'express'
import { UsersService } from './users.service'
import { formatResponse } from '@src/utils'

async function findMany(req: Request, res: Response, next: NextFunction) {
   try {
      res.json(formatResponse(req, res, await UsersService.findMany(req.query)))
   } catch (err) {
      next(err)
   }
}

async function findOne(req: Request, res: Response, next: NextFunction) {
   try {
      res.json(formatResponse(req, res, await UsersService.findOne(req.params.id)))
   } catch (err) {
      next(err)
   }
}

async function create(req: Request, res: Response, next: NextFunction) {
   try {
      res.status(201).json(formatResponse(req, res, await UsersService.create(req.body)))
   } catch (err) {
      next(err)
   }
}

async function update(req: Request, res: Response, next: NextFunction) {
   try {
      res.json(formatResponse(req, res, await UsersService.update(req.params.id, req.body)))
   } catch (err) {
      next(err)
   }
}

async function remove(req: Request, res: Response, next: NextFunction) {
   try {
      res.json(formatResponse(req, res, await UsersService.remove(req.params.id)))
   } catch (err) {
      next(err)
   }
}

export const UsersController = { findMany, findOne, create, update, remove }