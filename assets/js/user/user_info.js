$(function () {
  const form = layui.form
  const layer = layui.layer

  form.verify({
    nick: function (value) {
      if (value.length > 6) {
        return '昵称必须是 1-6 位的非空字符'
      }
    }
  })
  const initInfo = () => {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success(res) {
        if (res.code !== 0) return layer.msg('请求用户信息失败')
        // 1.给表单进行回显
        // form.val('指定的表单','指定的值')
        form.val('userForm', res.data)
      }
    })
  }
  initInfo()
  // 给重置按钮添加点击事件
  $('#btnReset').on('click', function (e) {
    // 阻止默认的重置行为
    e.preventDefault()
    // 重新刷新用户信息
    initInfo()
  })

  // 
  $('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'PUT',
      url: '/my/userinfo',
      data: form.val('userform'),
      success(res) {
        console.log(res)
        if (res.code !== 0) return layer.msg('更新用户信息失败')
        // 
        window.parent.getUserinfo()
      }
    })
  })
})
