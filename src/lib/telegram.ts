import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN!, {
	polling: false,
});

export async function sendTelegramMessage(text: string) {
	try {
		const isProduction = process.env.NODE_ENV === "production";
		const allowInDev = process.env.TELEGRAM_ENABLE_NON_PROD === "true";

		console.log(`Telegram Message: ${text}`);
		if (!isProduction && !allowInDev) {
			console.warn(
				"[Telegram] Skipped sending message: Notifications are disabled in non-production environments.\n" +
					"To enable Telegram messages in development, set TELEGRAM_ENABLE_NON_PROD=true in your .env file.",
			);
			return;
		}

		await bot.sendMessage(process.env.TELEGRAM_CHANNEL!, text, {
			parse_mode: "HTML",
		});
		console.log("[Telegram] Sent message successfully.");
	} catch (err) {
		console.error("[Telegram] Failed to send message:", err);
	}
}
