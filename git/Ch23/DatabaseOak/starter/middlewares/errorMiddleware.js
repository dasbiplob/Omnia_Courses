const errorMiddleware = async (context, next) => {
  try {
    await next();
  } catch (e) {
    console.error(e);
    context.response.status = 500;
    context.response.body = "Internal Server Error";
  }
};

export { errorMiddleware };
