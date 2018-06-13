const { promisify } = require('util');
const { client } = require('./redis-client')

const saddAsync = promisify(client.sadd).bind(client);
const sismemberAsync = promisify(client.sismember).bind(client);
const sremAsync = promisify(client.srem).bind(client);
const delAsync = promisify(client.del).bind(client);
const scardAsync = promisify(client.scard).bind(client);

const KEY_POST_LIKE_SET = 'post:like'
const KEY_COMMENT_LIKE_SET = 'comment:like'

/**
 * 지정된 사용자가 '좋아요'를 표시.
 */
const like = (type, id, uid) => {
    // 새로운 값 넣으면 like는 1 이미 있는 값이면 0 
    return saddAsync(`${typeCheck(type)}:${id}`, uid) > 0
}

/**
 * 지정된 사용자가 '좋아요'를 취소.
 */
const unLike = (type, id, uid) => {
    return sremAsync(`${typeCheck(type)}:${id}`, uid) > 0
}

/**
 * 지정된 사용자가 게시물에 '좋아요'를 표시여부 확인.
 */
const isLiked = (type, id, uid) => {
    return sismemberAsync(`${typeCheck(type)}:${id}`, uid)
}

/**
 * 해당 게시물 '좋아요' 정보를 삭제. (게시물이 삭제되면 좋아요도 삭제)
 */
const deleteLikeInfo = (type, id) => {
    return delAsync(`${typeCheck(type)}:${id}`) > 0
}

/**
 * '좋아요' 횟수를 조회.
 */
const getLikeCount = (type, id) => {
    return scardAsync(`${typeCheck(type)}:${id}`)
}

/**
 * 주어진 게시물, 댓글 목록의 '좋아요' 횟수를 조회.
 */
const getCountList = (type, idList) => {
    let countList = []
    let t = typeCheck(type)
    
    for (const id of idList) {
        countList.push(scardAsync(`${t}:${id}`))
    }
    console.log(`countList: ${countList}`)
    return countList
}

const typeCheck = (type) => {
    if (type === 'post') return KEY_POST_LIKE_SET
    if (type === 'comment') return KEY_COMMENT_LIKE_SET
}

module.exports = {
    like, isLiked, unLike, deleteLikeInfo, getLikeCount, getCountList
}