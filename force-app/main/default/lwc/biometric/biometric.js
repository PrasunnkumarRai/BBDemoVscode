import { LightningElement } from 'lwc';
import { getBiometricsService } from 'lightning/mobileCapabilities';

export default class NimbusPluginBiometricsService extends LightningElement {
    status;
    biometricsService;

    connectedCallback() {
      this.biometricsService = getBiometricsService();
    }

    handleVerifyClick() {
      if (this.biometricsService.isAvailable()) {
        const options = {
          permissionRequestBody: "Required to confirm device ownership.",
          additionalSupportedPolicies: ['PIN_CODE']
        };
        this.biometricsService.checkUserIsDeviceOwner(options)
          .then((result) => {
            // Do something with the result
            if (result === true) {
              this.status = "✔ Current user is device owner."
            } else {
              this.status = "𐄂 Current user is NOT device owner."
            }
          })
          .catch((error) => {
            // Handle errors
            this.status = 'Error code: ' + error.code + '\nError message: ' + error.message;
          });
      } else {
        // service not available
        this.status = 'Problem initiating Biometrics service. Are you using a mobile device?';
      }
    }
}