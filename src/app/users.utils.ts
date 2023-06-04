import { User } from './modules/users/users.model'

const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  if (lastUser) {
    return lastUser.id
  }

  // Return a default ID if no users exist
  return (0).toString().padStart(5, '0')
}

export const generatedUserId = async () => {
  const currentId = await findLastUserId()

  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  console.log({ incrementedId })
  return incrementedId
}
