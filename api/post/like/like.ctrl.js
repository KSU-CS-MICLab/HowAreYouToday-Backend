/* API logic (controller) */

/**
 * 사용자는 각 게시물에 '좋아요' 표시를 한다.
 * 한 명의 사용자는 하나의 게시물에 대해 한 번만 좋아요를 표시할 수 있다.
 * 좋아요를 취소할 수도 있어야 한다.
 * 각 게시물에는 좋아요 횟수 정보를 출력해야한다.
 * 사용자는 게시물에 대해 좋아요 여부를 확인할 수 있어야한다.
 * 게시물이 삭제되면 좋아요 정보도 같이 삭제된다.
 * 게시물 목록에서 각 게시물에 대한 좋아요 횟수를 표시해야 한다.
 */

const { Comment, validate } = require('../../../models/comment')
const { Post } = require('../../../models/post')
const asyncMiddleware = require('../../../middleware/async')

const like = asyncMiddleware(async (res, req) => {

})

module.exports = {
    like
}