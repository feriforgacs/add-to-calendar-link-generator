import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

type Event = {
	title?: string;
	description?: string;
	location?: string;
	startDate?: string;
	endDate?: string;
};

type GeneratedLinks = {
	googleCalendarLink: string;
	outlookCalendarLink: string;
	yahooCalendarLink: string;
};

export const meta: MetaFunction = () => {
	return [{ title: "Add To Calendar Link Generator" }, { name: "description", content: "A simple tool to generate links to add events to calendars (Google Calendar, Outlook Calendar, AOL Calendar, Yahoo Calendar)" }];
};

export default function Index() {
	const [event, setEvent] = useState<Event>();
	const [generatedLinks, setGeneratedLinks] = useState<GeneratedLinks>({
		googleCalendarLink: "",
		outlookCalendarLink: "",
		yahooCalendarLink: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const eventDetails = { ...event, [e.target.name]: e.target.value };
		setEvent(eventDetails);

		const encodedTitle = encodeURIComponent(eventDetails?.title || "");
		const encodedDescription = encodeURIComponent(eventDetails?.description || "");
		const encodedLocation = encodeURIComponent(eventDetails?.location || "");
		const encodedStartDate = encodeURIComponent(eventDetails?.startDate || "");
		const encodedSartDateISO = eventDetails?.startDate ? new Date(eventDetails?.startDate).toISOString() : "";
		const encodedSartDateISOcleaned = encodedSartDateISO.replace(/[^0-9TZ]/g, "");
		const encodedEndDate = encodeURIComponent(eventDetails?.endDate || "");
		const encodedEndDateISO = eventDetails?.endDate ? new Date(eventDetails?.endDate).toISOString() : "";
		const encodedEndDateISOcleaned = encodedEndDateISO.replace(/[^0-9TZ]/g, "");

		setGeneratedLinks({
			googleCalendarLink: `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${encodedSartDateISO.replace(/[^0-9TZ]/g, "")}${encodedEndDateISO && "%2F"}${encodedEndDateISO.replace(/[^0-9TZ]/g, "")}&details=${encodedDescription}&location=${encodedLocation}`,
			outlookCalendarLink: `https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent&subject=${encodedTitle}&startdt=${encodedStartDate}&enddt=${encodedEndDate}&body=${encodedDescription}&location=${encodedLocation}`,
			yahooCalendarLink: `https://calendar.yahoo.com/?desc=${encodedDescription}&dur=${encodedEndDateISOcleaned ? "&et=" + encodedEndDateISOcleaned : ""}&in_loc=${encodedLocation}${encodedSartDateISOcleaned ? "&st=" + encodedSartDateISOcleaned : ""}&title=${encodedTitle}&v=60`,
		});
	};

  const highlight = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  }

	return (
		<main className={`bg-slate-900 text-slate-200 py-5 min-h-screen`}>
			<div className={`max-w-md mx-auto rounded-lg bg-slate-800 p-5 shadow-md`}>
				<h1 className={`text-2xl text-center mb-5`}>Add To Calendar Link Generator</h1>
				<p>A simple tool to generate links to add events to calendars (Google Calendar, Outlook Calendar, AOL Calendar, Yahoo Calendar)</p>
				<p>Just add the event details below, and copy the generated links. You can use them in your emails, DMs, etc.</p>
				<form className={`my-5`}>
					<div className={`mb-5`}>
						<label htmlFor="eventTitle" className={`block`}>
							Event Title
						</label>
						<input type="text" id="eventTitle" name="title" className={`w-full px-2 py-2 text-left border border-solid border-slate-900 rounded text-slate-950`} value={event?.title || ""} onChange={handleChange} />
					</div>
					<div className={`mb-5`}>
						<label htmlFor="eventDescription" className={`block`}>
							Event Description
						</label>
						<textarea id="eventDescription" name="description" className={`w-full px-2 py-2 text-left border border-solid border-slate-900 rounded text-slate-950`} value={event?.description || ""} onChange={handleChange} />
					</div>
					<div className={`mb-5`}>
						<label htmlFor="eventLocation" className={`block`}>
							Event Location
						</label>
						<input type="text" id="eventLocation" name="location" className={`w-full px-2 py-2 text-left border border-solid border-slate-900 rounded text-slate-950`} value={event?.location || ""} onChange={handleChange} />
					</div>
					<div className={`mb-5`}>
						<label htmlFor="eventStartDate" className={`block`}>
							Event Start Date
						</label>
						<input type="datetime-local" id="eventStartDate" name="startDate" className={`w-full px-2 py-2 text-left border border-solid border-slate-900 rounded text-slate-950`} value={event?.startDate || ""} onChange={handleChange} />
					</div>
					<div className={`mb-5`}>
						<label htmlFor="eventEndDate" className={`block`}>
							Event End Date
						</label>
						<input type="datetime-local" id="eventEndDate" name="endDate" className={`w-full px-2 py-2 text-left border border-solid border-slate-900 rounded text-slate-950`} value={event?.endDate || ""} onChange={handleChange} />
					</div>
				</form>

				<div className={`flex gap-4 flex-col`}>
					<h2 className={`text-lg my-5`}>Generated links</h2>
					<div className={`flex flex-col gap-2`}>
						<label htmlFor="googleCalendarLink">Google Calendar:</label>
						<input id="googleCalendarLink" type="text" value={generatedLinks.googleCalendarLink} readOnly className={`w-full px-2 py-2 text-left border border-solid border-slate-900 rounded text-slate-950`} onFocus={highlight} />
					</div>
					<div className={`flex flex-col gap-2`}>
						<label htmlFor="outlookCalendarLink">Outlook Calendar:</label>
						<input id="outlookCalendarLink" type="text" value={generatedLinks.outlookCalendarLink} readOnly className={`w-full px-2 py-2 text-left border border-solid border-slate-900 rounded text-slate-950`} onFocus={highlight} />
					</div>
					<div className={`flex flex-col gap-2`}>
						<label htmlFor="yahooCalendarLink">Yahoo Calendar:</label>
						<input id="yahooCalendarLink" type="text" value={generatedLinks.yahooCalendarLink} readOnly className={`w-full px-2 py-2 text-left border border-solid border-slate-900 rounded text-slate-950`} onFocus={highlight} />
					</div>
				</div>
			</div>
		</main>
	);
}
