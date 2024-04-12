import IssueSummary from "./IssueSummary";


export default function Home() {
    return (
        <IssueSummary open={10} inProgress={2} closed={5}></IssueSummary>
    );
}
