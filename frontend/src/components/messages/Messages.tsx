import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
	const  {messages, loading} = useGetMessages()

	useListenMessages()
	
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{messages.map((message) => (
				<Message key={message.id} message={message} />
			))}

			{messages.length === 0 && (
				<p className="text-center text-gray-300">
					Send a message!
				</p>
			)}

			{loading && <MessageSkeleton />}
		</div>
	);
};
export default Messages;
