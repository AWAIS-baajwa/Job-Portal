const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      // console.log("i am in asynchandler", error.name, error);
      next(error);
    });
  };
};
export default asyncHandler;
