import { VercelRequest, VercelResponse } from "@vercel/node";

export default async (request: VercelRequest, response: VercelResponse) => {
    const now = new Date(new Date().toUTCString());
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
    const origin = new Date(Date.UTC(2000, 0, 1, 0, 0, 0));

    const major = now.getUTCFullYear() - 2000;
    const minor = now.getUTCMonth() + 1;
    const build = Math.floor((now.getTime() - origin.getTime()) / 1000 / 60 / 60 / 24);
    const revision = Math.floor((now.getTime() - today.getTime()) / 1000 / 2);

    const version = [major, `${minor}`.padStart(2, "0"), build, revision].join(".");
    response.status(200).setHeader("Content-Type", "text/plain").send(version);
};
