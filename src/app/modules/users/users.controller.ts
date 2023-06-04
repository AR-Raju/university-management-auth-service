import { Request, Response } from 'express'
import service from './users.service'

const createUserController = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    console.log('request user', user)
    const result = await service.createUser(user)
    res.status(200).json({
      succcess: true,
      message: 'user created successfully',
      data: result,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Failed to create user',
    })
  }
}

export default {
  createUserController,
}
