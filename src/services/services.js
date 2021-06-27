import { datatableToObjects, getValue, removeAccents, consoleLog } from '../util/utils'
import Axios from 'axios'

export const postTest = async url => {
  try {
    const { data } = await Axios.post(url)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const post = async (url, registro = {}) => {
  try {
    const { data } = await Axios.post(url, registro)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const put = async (url, registro = {}) => {
  try {
    const { data } = await Axios.put(url, registro)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const postServiceDataTable = async (url, rawTable) => {
  try {
    const registros = await datatableToObjects(rawTable)
    for (const registro of registros) {
      try {
        await Axios.post(url, registro)
      } catch (err) {
        console.error(err)
        throw new Error(`${getValue(err, 'response.data.message')}: ${JSON.stringify(getValue(err, 'response.data.detail'))}`)
      }
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getService = async (url, filter, limit = 1, removeAccent = true) => {
  consoleLog(`URL => ${url}`.yellow)
  try {
    if (removeAccent) filter = await removeAccents(filter)
    const response = await Axios.get(url, {
      params: {
        limit,
        filter
      }
    })
    consoleLog(JSON.stringify(response))
    return response
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const deleteServiceFilterDataTable = async (url, rawTable) => {
  for (let l = 1; l < rawTable.length; l++) {
    await deleteServiceFilter(url, rawTable[l][0], 1000)
  }
}

export const getServiceAll = async (url, limit = 1000) => {
  try {
    const { data } = await Axios.get(url, {
      params: {
        limit
      }
    })
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const deleteServiceAll = async url => {
  const registros = await getServiceAll(url, 1000)
  for (const registro of registros) {
    await deleteService(url, registro)
  }
}

export const deleteService = async (url, registro = {}) => {
  try {
    const { data } = await Axios.delete(registro._id ? `${url}/${registro._id}` : url)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const deleteServiceFilter = async (url, filter, limit = 1) => {
  const response = await getService(url, filter, limit)
  for (const content of response.data.content) {
    try {
      await Axios.delete(`${url}/${content._id}`)
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

export const deleteServiceParams = async (url, parameters) => {
  consoleLog(JSON.stringify(parameters).bgGreen)
  try {
    await Axios.delete(url, { params: parameters })
  } catch (err) {
    console.error(err)
    throw err
  }
}
