import { json } from '@sveltejs/kit';

export async function GET() {
	return json({ "poop":"pee" }, { status: 201 });
}

