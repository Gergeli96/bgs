import { BitControl, IBitControl } from './gitform-types';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'bitform',
    templateUrl: './bitform.component.html',
    styleUrls: ['./bitform.component.scss']
})
export class BitformComponent<T = any> {
    public controls: BitControl<T>[]

    constructor() { }


    @Input('controls')
    public set controlsSetter(value: IBitControl[]) {
        if (!Array.isArray(value)) {
            this.controls = [ ]
        }
        else {
            this.controls = value.map(control => new BitControl(control))
        }
    }

    public get value(): T {
        return this.controls.reduce((value: any, control) => {
            value[control.name] = control.value
            return value
        }, { }) as T
    }

    public setValue(value: T): void {
        this.controls.forEach(control => control.setValue(value[control.name]))
    }

    public empty(): void {
        this.controls?.forEach(control => control.empty())
    }

    public submit(promise: Promise<any>): Promise<any> {
        return new Promise((resolve, reject) => {
            promise
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }
}
