import { Search } from "lucide-react";
import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("")
	const{ setselectedConversation } = useConversation()
	const { conversations } = useGetConversations()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if(!search.trim()) return
		const conversation = conversations.find((c: ConversationType) => c.fullName.toLowerCase().includes(search.toLowerCase()))

		if(conversation){
			setselectedConversation(conversation)
		}else{
			toast.error("no user found")
		}
	}

	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			<input
				type='text'
				placeholder='Search…'
				className='input-sm md:input input-bordered rounded-full sm:rounded-full w-full'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='btn md:btn-md btn-sm btn-circle bg-sky-500 text-white  '>
				<Search className='w-4 h-4 md:w-6 md:h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;
