// Dummy data for inbox
export const inboxData = [
  {
    id: 1,
    name: "Luis",
    source: "Github",
    preview: "Hey! I have a questio...",
    time: "45m",
    avatar: "L",
    avatarColor: "bg-indigo-500",
    messages: [
      {
        id: 1,
        sender: "customer",
        content: "Hey! I have a question about your GitHub integration.",
        time: "45m",
        seen: false
      },
      {
        id: 2,
        sender: "agent",
        content: "Sure! I'd be happy to help. What seems to be the issue?",
        time: "43m",
        seen: true
      }
    ]
  },
  {
    id: 2,
    name: "Ivan",
    source: "Nike",
    preview: "Hi there, I have a qu...",
    time: "30m",
    avatar: "I",
    avatarColor: "bg-red-500",
    flagged: true,
    messages: [
      {
        id: 1,
        sender: "customer",
        content: "Hi there, I have a question about my Nike order.",
        time: "30m",
        seen: false
      },
      {
        id: 2,
        sender: "agent",
        content: "Absolutely! Could you please provide your order ID?",
        time: "28m",
        seen: true
      }
    ]
  },
  {
    id: 3,
    name: "Lead from New York",
    preview: "Good morning, let me...",
    time: "45m",
    avatar: "L",
    avatarColor: "bg-blue-500",
    unread: true,
    messages: [
      {
        id: 1,
        sender: "customer",
        content: "Good morning, I’m looking for pricing info on your services.",
        time: "45m",
        seen: false
      },
      {
        id: 2,
        sender: "agent",
        content: "Hi! I'd be happy to share our pricing packages.",
        time: "42m",
        seen: true
      }
    ]
  },
  {
    id: 4,
    name: "Booking API problems",
    preview: "Bug report",
    subPreview: "Luis - Small Crafts",
    time: "45m",
    avatar: "B",
    avatarColor: "bg-gray-800",
    messages: [
      {
        id: 1,
        sender: "customer",
        content: "We're seeing an issue with your booking API. It's returning a 500 error.",
        time: "45m",
        seen: false
      },
      {
        id: 2,
        sender: "agent",
        content: "Thanks for reporting this, Luis. I’ll look into it immediately.",
        time: "44m",
        seen: true
      }
    ]
  },
  {
    id: 5,
    name: "Miracle",
    source: "Exemplary Bank",
    preview: "Hey there, I'm here to...",
    time: "45m",
    avatar: "M",
    avatarColor: "bg-gray-400",
    messages: [
      {
        id: 1,
        sender: "customer",
        content: "Hey there, I'm here to resolve a discrepancy in my bank statement.",
        time: "45m",
        seen: false
      },
      {
        id: 2,
        sender: "agent",
        content: "Of course! Could you tell me the transaction ID you're referring to?",
        time: "43m",
        seen: true
      }
    ]
  }
];