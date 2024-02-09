import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameInput,
  FrameReducer,
  NextServerPageProps,
  getPreviousFrame,
  useFramesReducer,
  getFrameMessage,
} from "frames.js/next/server";
import SudokuImage from "@/components/SudokuImage";

// type State = {
//   count: number
// };

// const initialState = { count: 0 };

// const reducer: FrameReducer<State> = (state, action) => {
//   return {
//     count: state.count + 1
//   };
// };
type PlayingState = {
  playingState: string;
};
type CountState = {
  count: number;
};

const initialState = { playingState: "not-started", count: 0 };

const playingReducer: FrameReducer<PlayingState> = (state, action) => {
  return {
    ...state,
    playingState:
      state.playingState == "not-started" ? "started" : "not-started",
  };
};

const countingReducer: FrameReducer<CountState> = (state, action) => {
  return {
    ...state,
    count:
      state.count + 1
  };
};

// This is a react server component only
export default async function Home({
  params,
  searchParams,
}: NextServerPageProps) {
  const previousFrame = getPreviousFrame<any>(searchParams);

  const frameMessage = false;

  // const frameMessage = await getFrameMessage(previousFrame.postBody, {
  //   ...DEBUG_HUB_OPTIONS,
  //   fetchHubContext: true,
  //   hubHttpUrl: "https://hub.freefarcasterhub.com:3281/",
  // });

  // if (frameMessage && !frameMessage?.isValid) {
  //   throw new Error("Invalid frame payload");
  // }


  const [playingState, displayPlayingState] = useFramesReducer<PlayingState>(
    playingReducer,
    initialState,
    previousFrame
  );
  const [countingState, dispatchCountingState] = useFramesReducer<CountState>(
    countingReducer,
    initialState,
    previousFrame
  );
console.log({anotherstate: playingState})
console.log({countingState})
  // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
  // example: load the users credentials & check they have an NFT

  // Example with satori and sharp:
  // const imageUrl = await
  // frameMessage;
  // const frameMessage = false

  // if (frameMessage) {
  //   const {
  //     isValid,
  //     buttonIndex,
  //     inputText,
  //     castId,
  //     requesterFid,
  //     casterFollowsRequester,
  //     requesterFollowsCaster,
  //     likedCast,
  //     recastedCast,
  //     requesterVerifiedAddresses,
  //     requesterUserData,
  //   } = frameMessage;

  //   console.log("info: frameMessage is:", frameMessage);
  // }

  const baseUrl = process.env.HOST || "http://localhost:3000";

  // const proofResult = await fetch(`${process.env.PROOF_API_URL}`)
  // const res = await proofResult.json()

  // then, when done, return next frame
  return (
    <div className="p-4">
      frames.js starter kit.{" "}
      <div>
        {/* {JSON.stringify(res)} */}
      </div>
      <FrameContainer
        postUrl="/frames"
        state={playingState}
        previousFrame={previousFrame}
      >
          <FrameImage>
            <SudokuImage />
          </FrameImage>
        <FrameInput text="put some text here" />
        <FrameButton onClick={displayPlayingState}>
          {playingState.playingState == "not-started" ? "Start" : "End"}
        </FrameButton>
        <FrameButton>{playingState.playingState}</FrameButton>
        <FrameButton onClick={dispatchCountingState}>Count</FrameButton>
        <FrameButton>{countingState.count}</FrameButton>
        {/* <FrameButton href={`https://www.google.com`}>External</FrameButton> */}
      </FrameContainer>
    </div>
  );
}
