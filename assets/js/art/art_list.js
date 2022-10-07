$(function () {
  let qs = {
    pagenum: 1, //当前页码值
    pagesize: 2, //当前每页显示多少条
    cate_id: '', //当前选择的文章分类
    state: ''  // 当前文章所处的状态,可选值：已发布，操作 都是字符串类型
  }
  loadArticleList()
  function loadArticleList() {
    $.ajax({
      method: 'GET',
      url: `/my/article/list?pagenum=${qs.pagenum}&pagesize=${qs.pagesize}&cate_id=${qs.cate_id}$state=${qs.state}`,
      success(res) {
        if (res.code !== 0) return layer.msg('获取文章列表失败')
        console.log(res)
      }
    })
  }
})