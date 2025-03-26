export const paginate = (page = 1, count = 10) => {
    let pageModel = { offset: (page - 1) * count, limit: Number(count) }

    return pageModel
}

export const getFields = (fields: string) => {
    return fields.split(',')
}
