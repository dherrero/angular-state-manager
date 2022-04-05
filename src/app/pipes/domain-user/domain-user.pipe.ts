import { Pipe, PipeTransform } from '@angular/core';

/**
 * DomainUserPipe
 */
@Pipe({
  name: 'domainUser'
})
export class DomainUserPipe implements PipeTransform {
  /**
   * Transformation logic
   *
   * @param value
   * @param args
   */
  transform(value: string): string {
    return value && (value.split('\\')[1] || value);
  }
}
