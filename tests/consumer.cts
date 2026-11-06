import { angularSeparation } from '@lp-labs/angular-separation';
if (angularSeparation(0, 0, 90, 0) !== 90) throw new Error('Angle');
// @ts-expect-error invalid argument must be rejected by declarations
angularSeparation('0', 0, 0, 0);
