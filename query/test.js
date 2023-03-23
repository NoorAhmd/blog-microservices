const condition = {
    name: 'startWith',
    filterKey: { [Op.iLike]: `${value}%` }
}


switch (matchMode) {
    case 'startsWith':
        return this.findAndCountAll({
            where: {
                [filterKey]: { [Op.iLike]: `${value}%` }
            },
            limit, offset, order: [[sortBy, sortOrder == 0 ? 'ASC' : 'DESC']]
        })
    case 'endsWith':
        return this.findAndCountAll({
            where: {
                [filterKey]: { [Op.iLike]: `%${value}` }
            },
            limit, offset, order: [[sortBy, sortOrder == 0 ? 'ASC' : 'DESC']]
        })
    case 'contains':
        return this.findAndCountAll({
            where: {
                [filterKey]: { [Op.iLike]: `%${value}%` }
            },
            limit, offset, order: [[sortBy, sortOrder == 0 ? 'ASC' : 'DESC']]
        })
    case 'notContains':
        return this.findAndCountAll({
            where: {
                [filterKey]: { [Op.notILike]: `%${value}%` }
            },
            limit, offset, order: [[sortBy, sortOrder == 0 ? 'ASC' : 'DESC']]
        })
    case 'equals':
        return this.findAndCountAll({
            where: {
                [filterKey]: { [Op.eq]: value }
            },
            limit, offset, order: [[sortBy, sortOrder == 0 ? 'ASC' : 'DESC']]
        })
    case 'notEquals':
        return this.findAndCountAll({
            where: {
                [filterKey]: { [Op.ne]: value }
            },
            limit, offset, order: [[sortBy, sortOrder == 0 ? 'ASC' : 'DESC']]
        })
    case 'before':
        return this.findAndCountAll({
            where: {
                [filterKey]: { [Op.lt]: value }
            },
            limit, offset, order: [[sortBy, sortOrder == 0 ? 'ASC' : 'DESC']]
        })
    case 'after':
        return this.findAndCountAll({
            where: {
                [filterKey]: { [Op.gt]: value }
            },
            limit, offset, order: [[sortBy, sortOrder == 0 ? 'ASC' : 'DESC']]
        })
}