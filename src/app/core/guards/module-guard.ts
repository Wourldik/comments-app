import { NgModule } from '@angular/core';

export function throwIfAlreadyLoaded(
  parentModule: NgModule | undefined,
  moduleName: string
) {
  if (parentModule) {
    throw new Error(
      `${moduleName} has already been loaded. Import Core modules in the AppModule only.`
    );
  }
}
