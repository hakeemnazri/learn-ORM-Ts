import { create } from "zustand"

interface ConversationState {
    selectedConversation: ConversationType | null,
    setselectedConversation: (conversation: ConversationType) => void,
    messages: MessageType[],
    setMessages: (messages: MessageType[]) => void
}

const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setselectedConversation: (conversation) => set({selectedConversation: conversation}),
    messages: [],
    setMessages: (messages) => set({messages: messages})
}))

export default useConversation