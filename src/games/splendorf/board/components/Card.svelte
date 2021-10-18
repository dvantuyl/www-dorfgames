<script>
	import { ColorClass } from './colorclass';
	import Token from './Token.svelte';

	export let clr;
	export let pts;
	export let cost;

	$: costs = Object.entries(cost).sort((a, b) => b[1] - a[1]);

	function randPercent() {
		return `${Math.floor(Math.random() * 100)}%`;
	}
</script>

<div class="mx-auto aspect-w-2 aspect-h-3 rounded-lg">
	<div class="w-full h-full rounded-lg {ColorClass[clr].bg}">
		<div
			class="card-bg rounded-lg h-full w-full flex p-2"
			style="background-position: {randPercent()} {randPercent()}"
		>
			<div class="w-1/4 h-full flex flex-col justify-end">
				{#each costs as cost}
					{#if cost[1]}
						<div class="h-1/5">
							<Token color={cost[0]} count={cost[1]} />
						</div>
					{/if}
				{/each}
			</div>
			<div class="relative w-3/4 h-auto opacity-80" class:hidden={!pts}>
				<div class="absolute top-0 right-0 w-full h-auto">
					<svg height="100%" width="100%" viewBox="0 0 100 100" class="fill-current text-black">
						<text
							x="70"
							y="50"
							dominant-baseline="middle"
							text-anchor="middle"
							class="text-7xl font-black {ColorClass[clr].text.tx}"
						>
							{pts}
						</text>
					</svg>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.card-bg {
		background-image: url("data:image/svg+xml,%3Csvg xlink='http://www.w3.org/1999/xlink' viewBox='0 0 5000 5000' xmlns='http://www.w3.org/2000/svg' style='transform: scale(4.32)%3B'%3E%3Cdefs%3E%3Cfilter id='goo'%3E%3CfeGaussianBlur in='SourceGraphic' stdDeviation='10.725' result='blur'%3E%3C/feGaussianBlur%3E%3CfeColorMatrix in='blur' type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19 -9' result='good'%3E%3C/feColorMatrix%3E%3CfeComposite in='SourceGraphic' in2='goo' operator='atop'%3E%3C/feComposite%3E%3C/filter%3E%3Cpath d='M355 243C356 284 280 275 270 281C260 288 243 360 205 345C169 326 214 264 213 252C213 238 164 179 194 161C223 143 252 211 266 217C279 223 353 209 355 243z' id='P0'%3E%3C/path%3E%3Cpath d='M348 204C360 229 289 252 286 262C283 271 327 332 296 348C271 360 248 289 238 286C229 283 168 327 152 296C140 271 211 248 215 236C218 227 178 163 204 152C229 140 252 211 264 215C273 218 337 178 348 204z' id='P1'%3E%3C/path%3E%3Cpath d='M213 172C228 164 248 216 256 217C263 218 297 175 313 191C325 203 282 237 283 246C284 252 336 272 325 291C318 306 272 276 264 280C259 283 256 338 234 334C217 332 232 279 226 273C221 268 168 283 165 261C162 244 217 241 221 234C224 228 194 182 213 172z' id='P2'%3E%3C/path%3E%3Cpath d='M208 270C201 253 225 242 230 235C234 229 235 204 253 204C271 206 269 232 273 239C277 248 296 265 287 277C278 289 258 275 248 275C239 274 214 283 208 270z' id='P3'%3E%3C/path%3E%3Cpath d='M313 326C294 343 254 272 249 272C243 271 195 336 174 313C157 294 228 254 228 249C229 243 164 195 187 174C206 157 246 228 253 229C258 229 310 167 326 187C343 206 272 246 271 253C271 258 333 310 313 326z' id='P4'%3E%3C/path%3E%3Cpath d='M255 288C248 289 244 274 239 271C235 269 220 275 216 266C212 260 226 252 227 246C227 241 217 229 224 222C229 217 241 227 247 227C252 226 260 212 268 217C275 220 269 235 271 240C274 244 289 248 287 257C286 264 271 263 266 267C263 271 264 286 255 288z' id='P5'%3E%3C/path%3E%3Cpath d='M300 171C330 192 286 241 285 252C284 263 325 312 295 331C262 348 241 286 231 279C220 272 155 275 157 244C159 214 222 227 233 220C245 214 275 155 300 171z' id='P6'%3E%3C/path%3E%3Cpath d='M219 284C210 276 225 258 225 252C224 245 207 230 216 219C224 210 242 225 248 225C255 224 270 207 281 216C290 224 275 242 275 248C276 255 293 270 284 281C276 290 258 275 252 275C245 276 230 293 219 284z' id='P7'%3E%3C/path%3E%3Cpath d='M359 229C364 250 289 257 285 266C282 273 328 333 303 347C285 359 255 289 245 288C238 287 195 350 174 331C158 317 214 267 212 257C211 250 138 229 150 203C158 183 223 221 232 217C238 213 236 137 264 140C285 141 269 216 276 222C282 227 353 201 359 229z' id='P8'%3E%3C/path%3E%3Cpath d='M199 263C194 243 225 236 232 231C238 225 243 195 263 199C283 205 274 235 276 243C278 254 299 277 286 289C274 300 254 278 243 276C233 273 203 280 199 263z' id='P9'%3E%3C/path%3E%3Cpath d='M191 246C192 231 226 235 231 230C236 225 235 191 254 191C269 192 265 226 270 231C275 236 309 235 309 254C308 269 274 265 269 270C264 275 265 309 246 309C231 308 235 274 230 269C225 264 191 265 191 246z' id='P10'%3E%3C/path%3E%3Cpath d='M244 159C262 157 261 216 268 221C274 224 326 195 335 217C342 232 285 250 283 259C282 265 326 305 308 320C295 332 261 284 252 284C246 285 221 339 201 327C186 318 222 271 218 263C215 257 156 250 162 227C165 210 222 229 228 224C233 219 221 161 244 159z' id='P11'%3E%3C/path%3E%3C/defs%3E%3Cg id='group' fill='%23FFF' filter='url(%23goo)' opacity='0.11'%3E%3Cuse x='-68' y='156' href='%23P11'%3E%3C/use%3E%3Cuse x='93' y='470' href='%23P10'%3E%3C/use%3E%3Cuse x='-55' y='1051' href='%23P3'%3E%3C/use%3E%3Cuse x='-134' y='1393' href='%23P5'%3E%3C/use%3E%3Cuse x='252' y='1989' href='%23P10'%3E%3C/use%3E%3Cuse x='66' y='2802' href='%23P6'%3E%3C/use%3E%3Cuse x='-18' y='3289' href='%23P5'%3E%3C/use%3E%3Cuse x='207' y='3846' href='%23P7'%3E%3C/use%3E%3Cuse x='72' y='4073' href='%23P3'%3E%3C/use%3E%3Cuse x='-178' y='4608' href='%23P4'%3E%3C/use%3E%3Cuse x='147' y='5013' href='%23P3'%3E%3C/use%3E%3Cuse x='443' y='149' href='%23P2'%3E%3C/use%3E%3Cuse x='824' y='583' href='%23P1'%3E%3C/use%3E%3Cuse x='799' y='1046' href='%23P11'%3E%3C/use%3E%3Cuse x='799' y='1672' href='%23P7'%3E%3C/use%3E%3Cuse x='454' y='1972' href='%23P2'%3E%3C/use%3E%3Cuse x='801' y='2839' href='%23P1'%3E%3C/use%3E%3Cuse x='416' y='3319' href='%23P2'%3E%3C/use%3E%3Cuse x='809' y='3762' href='%23P3'%3E%3C/use%3E%3Cuse x='401' y='4263' href='%23P7'%3E%3C/use%3E%3Cuse x='814' y='4909' href='%23P1'%3E%3C/use%3E%3Cuse x='470' y='5208' href='%23P1'%3E%3C/use%3E%3Cuse x='1188' y='-109' href='%23P11'%3E%3C/use%3E%3Cuse x='958' y='483' href='%23P10'%3E%3C/use%3E%3Cuse x='1379' y='1255' href='%23P3'%3E%3C/use%3E%3Cuse x='1298' y='1643' href='%23P3'%3E%3C/use%3E%3Cuse x='1383' y='1879' href='%23P9'%3E%3C/use%3E%3Cuse x='1134' y='2686' href='%23P11'%3E%3C/use%3E%3Cuse x='978' y='3254' href='%23P3'%3E%3C/use%3E%3Cuse x='1005' y='3885' href='%23P6'%3E%3C/use%3E%3Cuse x='1291' y='4210' href='%23P6'%3E%3C/use%3E%3Cuse x='1080' y='4570' href='%23P7'%3E%3C/use%3E%3Cuse x='922' y='5438' href='%23P3'%3E%3C/use%3E%3Cuse x='1937' y='120' href='%23P7'%3E%3C/use%3E%3Cuse x='1760' y='412' href='%23P9'%3E%3C/use%3E%3Cuse x='1400' y='1247' href='%23P8'%3E%3C/use%3E%3Cuse x='1750' y='1634' href='%23P4'%3E%3C/use%3E%3Cuse x='1793' y='1988' href='%23P7'%3E%3C/use%3E%3Cuse x='1438' y='2678' href='%23P7'%3E%3C/use%3E%3Cuse x='1433' y='3413' href='%23P3'%3E%3C/use%3E%3Cuse x='1821' y='3602' href='%23P4'%3E%3C/use%3E%3Cuse x='1692' y='4465' href='%23P1'%3E%3C/use%3E%3Cuse x='1751' y='4981' href='%23P10'%3E%3C/use%3E%3Cuse x='1828' y='5308' href='%23P4'%3E%3C/use%3E%3Cuse x='2318' y='-155' href='%23P1'%3E%3C/use%3E%3Cuse x='1974' y='789' href='%23P11'%3E%3C/use%3E%3Cuse x='2110' y='827' href='%23P5'%3E%3C/use%3E%3Cuse x='2214' y='1430' href='%23P3'%3E%3C/use%3E%3Cuse x='2177' y='2197' href='%23P11'%3E%3C/use%3E%3Cuse x='2353' y='2642' href='%23P10'%3E%3C/use%3E%3Cuse x='2196' y='3071' href='%23P3'%3E%3C/use%3E%3Cuse x='2392' y='3689' href='%23P2'%3E%3C/use%3E%3Cuse x='1988' y='4180' href='%23P3'%3E%3C/use%3E%3Cuse x='1993' y='4671' href='%23P2'%3E%3C/use%3E%3Cuse x='2480' y='5448' href='%23P4'%3E%3C/use%3E%3Cuse x='2943' y='-121' href='%23P10'%3E%3C/use%3E%3Cuse x='2546' y='617' href='%23P4'%3E%3C/use%3E%3Cuse x='2775' y='874' href='%23P10'%3E%3C/use%3E%3Cuse x='2847' y='1637' href='%23P1'%3E%3C/use%3E%3Cuse x='2733' y='2056' href='%23P8'%3E%3C/use%3E%3Cuse x='3008' y='2857' href='%23P3'%3E%3C/use%3E%3Cuse x='2735' y='3280' href='%23P0'%3E%3C/use%3E%3Cuse x='2835' y='3874' href='%23P3'%3E%3C/use%3E%3Cuse x='2948' y='4257' href='%23P9'%3E%3C/use%3E%3Cuse x='2968' y='4732' href='%23P4'%3E%3C/use%3E%3Cuse x='2742' y='5414' href='%23P10'%3E%3C/use%3E%3Cuse x='3199' y='261' href='%23P6'%3E%3C/use%3E%3Cuse x='3161' y='482' href='%23P7'%3E%3C/use%3E%3Cuse x='3259' y='862' href='%23P10'%3E%3C/use%3E%3Cuse x='3301' y='1806' href='%23P9'%3E%3C/use%3E%3Cuse x='3483' y='2065' href='%23P8'%3E%3C/use%3E%3Cuse x='3375' y='2706' href='%23P1'%3E%3C/use%3E%3Cuse x='3358' y='3211' href='%23P3'%3E%3C/use%3E%3Cuse x='3217' y='3655' href='%23P11'%3E%3C/use%3E%3Cuse x='3324' y='4091' href='%23P0'%3E%3C/use%3E%3Cuse x='3400' y='4663' href='%23P2'%3E%3C/use%3E%3Cuse x='3579' y='5139' href='%23P4'%3E%3C/use%3E%3Cuse x='3721' y='-21' href='%23P1'%3E%3C/use%3E%3Cuse x='4010' y='428' href='%23P0'%3E%3C/use%3E%3Cuse x='3847' y='1002' href='%23P0'%3E%3C/use%3E%3Cuse x='3862' y='1527' href='%23P6'%3E%3C/use%3E%3Cuse x='3899' y='1950' href='%23P9'%3E%3C/use%3E%3Cuse x='3927' y='2774' href='%23P7'%3E%3C/use%3E%3Cuse x='3609' y='3198' href='%23P6'%3E%3C/use%3E%3Cuse x='4092' y='3453' href='%23P1'%3E%3C/use%3E%3Cuse x='3910' y='4049' href='%23P10'%3E%3C/use%3E%3Cuse x='4055' y='4515' href='%23P11'%3E%3C/use%3E%3Cuse x='3794' y='5210' href='%23P1'%3E%3C/use%3E%3Cuse x='4280' y='237' href='%23P4'%3E%3C/use%3E%3Cuse x='4430' y='428' href='%23P10'%3E%3C/use%3E%3Cuse x='4316' y='852' href='%23P8'%3E%3C/use%3E%3Cuse x='4346' y='1573' href='%23P10'%3E%3C/use%3E%3Cuse x='4315' y='2054' href='%23P8'%3E%3C/use%3E%3Cuse x='4371' y='2530' href='%23P5'%3E%3C/use%3E%3Cuse x='4341' y='3107' href='%23P7'%3E%3C/use%3E%3Cuse x='4685' y='3433' href='%23P0'%3E%3C/use%3E%3Cuse x='4427' y='4392' href='%23P4'%3E%3C/use%3E%3Cuse x='4348' y='4958' href='%23P7'%3E%3C/use%3E%3Cuse x='4227' y='5293' href='%23P6'%3E%3C/use%3E%3Cuse x='5150' y='201' href='%23P10'%3E%3C/use%3E%3Cuse x='4767' y='302' href='%23P10'%3E%3C/use%3E%3Cuse x='4719' y='1137' href='%23P2'%3E%3C/use%3E%3Cuse x='4718' y='1516' href='%23P4'%3E%3C/use%3E%3Cuse x='4997' y='2021' href='%23P0'%3E%3C/use%3E%3Cuse x='4940' y='2425' href='%23P0'%3E%3C/use%3E%3Cuse x='4841' y='3031' href='%23P4'%3E%3C/use%3E%3Cuse x='5183' y='3613' href='%23P2'%3E%3C/use%3E%3Cuse x='4961' y='3950' href='%23P4'%3E%3C/use%3E%3Cuse x='4794' y='4565' href='%23P11'%3E%3C/use%3E%3Cuse x='4948' y='5313' href='%23P10'%3E%3C/use%3E%3C/g%3E%3C/svg%3E");
		background-size: contain;
	}
</style>
