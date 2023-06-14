export default function httpStatus(status: string): number {
  switch (status) {
    case 'INVALID_DATA': return 400;
    case 'NOT_FOUND': return 404;
    case 'UNAUTHORIZED': return 401;
    default: return 500;
  }
}
