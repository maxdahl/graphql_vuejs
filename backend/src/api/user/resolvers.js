import bcrypt from "bcrypt";

export default {
  Query: {
    async getUser(parent, args, ctx, info) {
      return null;
    }
  },

  Mutation: {
    async createUser(parent, args, ctx, info) {
      const { username, email, password } = args;
      const userModel = ctx.api.user;

      const user = new userModel({ username, email, password });
      user.password = await bcrypt.hash(password, 10);

      await user.save();
      return user;
    },

    async updateUser(parent, args, ctx, info) {
      return null;
    },

    async login(parent, args, ctx, info) {
      const { email, password } = args;
      const userModel = ctx.api.user;

      const user = await userModel.findOne({ email });
      if (!user) throw new Error("Invalid user credentials");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid user credentials");

      ctx.request.session.user = user;
      return user;
    }
  }
};
