import useGetConversations from "../../hooks/useGetConversation";
import Conversation from "./Conversation";

const Conversations = () => {

	const { conversations, loading } = useGetConversations()
	
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation) => (
				<Conversation key={conversation.id} conversation={conversation} />
			))}
			{loading ? (<span className="loading loading-dots loading-md"/>) : (null) }
		</div>
	);
};
export default Conversations;
