class Login {
  static async login(ctx) {
    const { accountid } = ctx.req.body;

    const token = await ctx.redis.get('login_tokens', accountid);
    if (token !== ctx.req.body.token) {
      ctx.end('s2c.notice', '登录失败，token无效！');
    }
  }
}

module.exports = Login;
