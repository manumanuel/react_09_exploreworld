export default function delay(req, res, next) {
  setTimeout(() => {
    next();
  }, 500); // 500ms delay
}
