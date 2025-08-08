import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN!, {
	polling: false,
});

export async function sendTelegramMessage(text: string) {
	try {
		await bot.sendMessage(process.env.TELEGRAM_CHANNEL!, text, {
			parse_mode: "HTML",
		});
		console.log("Sent message on telegram");
	} catch (err) {
		console.error("Failed to send Telegram message:", err);
	}
}
