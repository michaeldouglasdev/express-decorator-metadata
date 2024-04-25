export function ApiVersion(version: string): ClassDecorator {
    return (target) => {
    Object.assign(target.prototype, {__version: version});
    Object.defineProperty(target.prototype, 'xversion', {
      value: version,
      enumerable: false
    })
  }
}