// ./app/page.tsx

import {
  FrameContainer,
  FrameImage,
  FrameButton,
  useFramesReducer,
  getPreviousFrame,
  validateActionSignature,
  FrameInput,
} from "frames.js/next/server";

//@ts-expect-error
const reducer = (state, action) => ({ count: state.count + 1 });

//@ts-expect-error
export default async function Home(props) {
  const previousFrame = getPreviousFrame(props.searchParams);
  await validateActionSignature(previousFrame.postBody);
  const [state, dispatch] = useFramesReducer(
    reducer,
    { count: 0 },
    previousFrame
  );

	return (
    <>
      <div>Hello world</div>
      <FrameContainer
        postUrl="/frames"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage src="https://picsum.photos/seed/frames.js/1146/600" />
        <FrameButton onClick={dispatch}>{state.count}</FrameButton>
      </FrameContainer>
    </>
  );
}