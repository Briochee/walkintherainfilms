import React from "react";
import "./updates.css";

const updatesData = [
	{
		title: "If the Dancer Dances",
		info: "Walk in the Rain Films is currently in production (2025) on a film about choreographer Stephen Petronio and his ground-breaking work.",
		tags: {
			"The New York Times, Critic’s Pick": "Improbably poignant ... even viewers without the faintest grasp of dance technique will gain a strong sense of what made [Merce] Cunningham’s work groundbreaking.",
			"The Hollywood Reporter": "A moving cinematic tribute ... Captures the passion and the sweat of performance.",
			"LA Times": "Lovingly crafted documentary",
			"CBS News": "Marvelous.",
			"Film Inquiry": "Riveting … A tender, intimate look at how the works of famed dance choreographers are kept alive, given the ephemeral nature of movement itself.",
			"The New York Times": "Remarkably vivid...such an arc of experience. Alastair Macauley, former chief dance critic",
			"The Pop Break": "Compelling ... A detailed examination of the artistic process that should entertain any viewer who just likes to watch artists work.",
			"Film Threat": "Fascinating … If the Dancer Dances is obviously a must-see for any dancer, but even more than that, it’s a good viewing experience for artists of any discipline. It validates all the blood, sweat, and tears that go into any creative endeavor.",
			"Black Book": "Riveting ... A startling reminder of how Cunningham's challenging work is as relevant now as it was 50 years ago."
		}
	},
];

export default function Updates() {
	return (
		<section className="updates-wrap">
			<h1 className="updates-page-title">Updates</h1>

			<div className="updates-list">
				{updatesData.map((u, i) => (
					<article key={i} className="updates-entry">
						<h2 className="update-title">{u.title}</h2>
						<p className="update-info">{u.info}</p>

						{u.tags && (
							<div className="update-tags">
								{Object.entries(u.tags)
									.sort(([, msgA], [, msgB]) => msgA.length - msgB.length)
									.map(([from, message], idx) => (
										<div key={idx} className="update-tag">
											<div className="update-tag-message">
												{message}
											</div>
											<div className="update-tag-from">
												<em>- {from}</em>
											</div>
										</div>
									))}
							</div>
						)}
					</article>
				))}
			</div>
		</section>
	);
}