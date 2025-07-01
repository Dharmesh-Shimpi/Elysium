const BASE_URL = "https://api.coingecko.com/api/v3";

class ApiClient {
	constructor() {
		this.retryAttempts = 3;
		this.retryDelay = 1000;
		this.apiKey = "CG-yKyPYcGyTmy49ryT1w2Zmmj8"; // This key is here for the Assigement sake.  Key should never be on the client side. Also given from backend.
	}

	async request(url, options = {}) {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

		const fetchOptions = {
			...options,
			signal: controller.signal,
			headers: {
				accept: "application/json",
				"x-cg-demo-api-key": this.apiKey,
				...(options.headers || {}),
			},
		};

		try {
      const response = await fetch(url, fetchOptions);

			clearTimeout(timeoutId);

			if (!response.ok) {
				throw new Error(
					`HTTP ${response.status}: ${response.statusText}`,
				);
      }
      
      const ans = await response.json();
      // console.log(ans);
			return ans;
		} catch (error) {
			clearTimeout(timeoutId);

			if (error.name === "AbortError") {
				throw new Error("Request timeout");
			}

			throw error;
		}
	}

	async requestWithRetry(url, options = {}) {
		let lastError;

		for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
			try {
				return await this.request(url, options);
			} catch (error) {
				lastError = error;

				if (attempt === this.retryAttempts) {
					break;
				}

				// Exponential backoff
				const delay = this.retryDelay * Math.pow(2, attempt - 1);
				await new Promise((resolve) => setTimeout(resolve, delay));
			}
		}

		throw lastError;
	}

	async getTopCryptos(limit = 50, page = 1) {
		const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=${page}&sparkline=false&price_change_percentage=24h%2C7d`;
		return this.requestWithRetry(url);
	}

	async getSimplePrice(fromCoin, toCoin) {
		const url = `${BASE_URL}/simple/price?ids=${fromCoin}&vs_currencies=${toCoin}`;
		return this.requestWithRetry(url);
	}

	async getSupportedCoins() {
		const url = `${BASE_URL}/coins/list`;
		return this.requestWithRetry(url);
	}
}

export const apiClient = new ApiClient();
