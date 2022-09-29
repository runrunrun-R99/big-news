$(function () {

  // 点击去注册
  $('#go2Reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })


  // 点击去登录
  $('#go2Login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  // 需要从 layui 对象身上取到对应的属性
  const form = layui.form
  const layer = layui.layer
  form.verify({
    // 添加自定义规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      // 拿到密码框和再次确认密码作比较
      // 属性选择器:$('[name=xxx]').val()
      if ($('#password').val() !== value) {
        return '两次密码输入不一致'
      }
    }
  })

  // 将 key=value 形式的数据,转成json格式的字符串
  const format2Json = (source) => {
    let target = {}
    source.split('&').forEach((el) => {
      let kv = el.split('=')
      target[kv[0]] = kv[1]
    })
    return JSON.stringify(target)
  }
  // 给注册表单添加提交时间(会刷新浏览器)
  // $('#formReg).on(submit(function)(){})
  $('#formReg').on('submit', function (e) {
    e.preventDefault()
    // 发起 ajax 请求
    // 经过分析: 1.修改content—Type 2.需要将参数转成 json 格式
    $.ajax({
      method: 'POST',
      url: '/api/reg',
      contentType: 'application/json',
      // data: JSON.stringify({
      //   username: $('#formReg [name=username]').val(),
      //   password: $('#formReg [name=password]').val(),
      //   repassword: $('#formReg [name=repassword]').val()
      // }),
      data: format2Json($(this).serialize()),
      success(res) {
        if (res.code !== 0) return layer.msg(res.message)
        $('#go2Login').click()
        layer.msg('注册成功,请登录')
        // 打开登陆页面 (模拟点击事件 1.click 2.trigger('click) 3.triggerHandler('click) )

      }
    })
  })

  // 给登录表单添加提交事件
  $('#formLogin').on('submit', function (e) {
    e.preventDefault()
    // 发起 ajax 请求
    // 经过分析: 1.修改content—Type 2.需要将参数转成 json 格式
    $.ajax({
      method: 'POST',
      url: '/api/login',
      contentType: 'application/json',
      data: format2Json($(this).serialize()),
      success(res) {
        if (res.code !== 0) return layer.msg(res.message)
        // 跳转到主页
        // token 相当于令牌 (下一次去请求有权限的接口的时候“带着”)
        localStorage.setItem('big_news_token', res.token)
        // 固定的写法:Bearer token 字符串、Bearer 译为持票人拿着 token 去请求
        location.href = '/index.html'
      }
    })
  })
})

