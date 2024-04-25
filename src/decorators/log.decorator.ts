export function Log(): MethodDecorator {
  function log (prototype: Object, methodName: string | symbol, methodDescriptor: TypedPropertyDescriptor<any>) {
    console.log('log')
    const originalMethod = methodDescriptor.value;
    methodDescriptor.value = async function(...args: any[]) {
      console.log(`Class ${this.constructor.name}`)
      console.log(`Init Method ${String(methodName)}, args: ${JSON.stringify(args)}`)
      await originalMethod.apply(this, args);
      console.log(`End Method ${String(methodName)}`)
    }

    return methodDescriptor;
  }

  return log;
}

