import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import UrlError from "./UrlError";
import { Suspense } from "react";
import Download from "./Download";

type ResultProps = {
  url: string;
};

export default async function Result({ url }: ResultProps) {
  if (!url) return "";
  const res = await fetch(
    `https://api.tricksofthe.trade/fetch_metadata/${url}`
  );
  const json = await res.json();
  if (json[0].error) {
    return <UrlError error={json[0].error} />;
  }
  const videoDate = moment(json[1].upload_date).format("MMMM Do YYYY");
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="py-4 px-6">
        <div className="flex justify-between text-2xl">
          <p className="truncate max-w-2xl">{json[1].fulltitle}</p>
          <p className="truncate max-w-fit invisible xl:visible">{videoDate}</p>
        </div>
        <div className="flex mt-4 gap-2 flex-wrap">
          <div className="flex flex-col items-center sm:items-left">
            <Image
              className="object-contain md:max-w-xs xl:max-w-md rounded-3xl border border-black"
              src={json[1].thumbnail}
              width={1280}
              height={720}
              quality={1}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAGAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAiEAACAAUEAwEAAAAAAAAAAAABAgMEBxESAAUGIQgJUmH/xAAVAQEBAAAAAAAAAAAAAAAAAAAABf/EAB4RAQABAgcAAAAAAAAAAAAAAAECAAQFERIiQaGx/9oADAMBAAIRAxEAPwBTLyRptRzcY3KeH0tMSb3YTUlGydJa6qVZ2LJkbEYgILKMQez2aI/tcSTdpNaQm0AmGLbl89fH5pppDaaSpWEwiW0U5y6A8K//2Q=="
              alt="thumb"
            />

            <Link
              className="flex items-center justify-center py-3 hover:underline"
              href={json[1].thumbnail}
              target="_blank"
            >
              <p className="text-sm sm:text-md md:text-lg">
                I wanna download just Thumbnail...
              </p>
              <Image
                src="/images/search/download.svg"
                width={32}
                height={32}
                alt="download"
              />
            </Link>
          </div>
          <div className="flex flex-col justify-center mb-10 gap-8 w-full md:w-1/2">
            {json[1].duration > 5000 ? (
              <div>
                <p className="text-xl lg:text-2xl text-center">
                  Sorry, video longer than 1h:30min
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between gap-4 mx-auto">
                  <p className="text-2xl lg:text-4xl">Audio</p>
                  <Download id={json[1].id} option="audio" />
                </div>
                <div className="flex items-center justify-between gap-4 mx-auto">
                  <p className="text-2xl lg:text-4xl">Video</p>
                  <Download
                    id={json[1].id}
                    option="video"
                    format={json[0].format_note}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
