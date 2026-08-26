/**
 * Owner-maintained public business information. Leave a field undefined until
 * it has been verified for publication; public components will never render a
 * fabricated address, registration number, or social account.
 */
export const businessInfo = {
  publicName: "TaxIn60Sec",
  legalName: undefined as string | undefined,
  registeredOffice: undefined as string | undefined,
  registrationLabel: undefined as string | undefined,
  registrationNumber: undefined as string | undefined,
  supportEmail: "compliance@taxin60sec.com",
  supportPhone: "+91 7013734079",
} as const;

