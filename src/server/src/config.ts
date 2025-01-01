export interface IConfig {
    port: number;
    prettyLog: boolean;
    apiKey: string;
    domain: string;
    prayerRequestFromEmail: string;
    prayerRequestRecipientEmail: string;
    branchName: string;
    gitSha: string;
}

const config: IConfig = {
    port: process.env.NODE_PORT ? Number(process.env.NODE_PORT) : 3000,
    prettyLog: process.env.NODE_ENV == 'development',
    apiKey: process.env.APPSETTINGS_API_KEY ?? 'unknown', // long guid from mailgun
    domain: process.env.APPSETTINGS_DOMAIN ?? 'unknown', // eg 'mg.priou.co.uk';
    prayerRequestFromEmail: process.env.APPSETTINGS_PRAYER_REQUEST_FROM_EMAIL ?? 'unknown',
    prayerRequestRecipientEmail: process.env.APPSETTINGS_PRAYER_REQUEST_RECIPIENT_EMAIL ?? 'unknown',
    branchName: process.env.APPSETTINGS_BRANCH_NAME ?? 'unknown',
    gitSha: process.env.APPSETTINGS_GIT_SHA ?? 'unknown',
};

export { config };
