import { Conversation, Message, SharedMediaItem, SharedFileItem, CommonGroupItem, UserProfile, AppSettings } from '../types';

export const CHITCHAT_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1WOIS1_RpvFlNj3rR9Ig_NcyIKnSCEoELjkq8vXOfC88L0JBuirbf6w_97Kt-69GTXfaen2-DkW83NKOSPh5MfUI0q74lesuqCIxRFU8fudAs1QQ6H9hBvvsR-ti1N4CyUVUZ4ZHQZwSshI-CiWaAQsitJIylPscfcv8O-mhUTzZKdwXmXiPp93v5tRGMXglRI9rvU8tTCO9A3rsntAIjoPuCqx8a1Vh8YWWWZSbBxSQiUTlLA5m4aQ8FOR';

export const CURRENT_USER: UserProfile = {
  id: 'current_user',
  name: 'Alex Morgan',
  username: 'alexm',
  email: 'alex@chitchat.com',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDPinLzlqTmdnX9SKaf9L1h-1k6SjIQjwS3Dt0PpM_gTAbpx1eGguHZGg5utKcQdFdIJRhLD-uwTBmVJXCUNoCDZAYElHSooRCgL03ENmEEivXvDS6Bbkt8bbBCVJHQEXfxnhVy3XMUkZWvfxoL16onXpIR7i9AquzYOCAz1Bn9FvLQNWEE36BdEgwbE96yLfVZwdIt8xSDa7yCeCIx1IUrrh5AO9bCOYq8YPdxi-y09U6YzkQSn33kvw',
  role: 'Senior Product Designer',
  bio: 'Designing intuitive human experiences. Coffee lover & cyclist ☕🚴',
  status: 'available',
  isVerified: true,
};

export const SETTINGS_USER: UserProfile = {
  id: 'settings_user',
  name: 'Taylor Swift',
  username: 'taylor',
  email: 'taylor@chitchat.io',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDMqYjVDqsBOHoY6vQH_jnlGJjj7DMJhSTEcaAsGkFGCYhp8SPDuF6sfdX4fkcffxwb51a9d9GYZKN-5hhNRIQWKU320ve31cdvSLWj28vGdYwmaZcMjEb73GqTo_fef8o9vtuZ0ZfHzfJ2g8FYOR1nRYN2vQWl0AwQriZ0nFo7OyZR010GdNLKiDK-R6SZvDBvLJn6mVSrfvIbFF8YK0jAQ98zeXeJMsADZmBfWTWo38Rpw-3-sSE9-A',
  role: 'Staff Product Designer',
  bio: 'Product Designer & UI enthusiast · Crafting pixel-sharp interaction paradigms',
  status: 'available',
  isVerified: true,
};

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-alex',
    name: 'Alex Morgan',
    handle: '@alexm',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD1x7NGnPy6w_Drrhh5jSInpKvsJfz8r0CS-ezfrQSIcsLdR6iuFmhP598bfW4658Qzg11nP46ccJNFyQ6tfdtHO-swweHQtkQ0z4sd-g2a0yp1Xi_tdPbs2OaNslVuToLwYRAE7qFd977PWrKvSYG2Fl_smW87dK2mOvqZbTD57EOgW-6Dg8XrLp-qGtds2BlAhmBrNMC1xZS_UjANOkvI-IK7j_b6jBXrFpIyoHOuBovFBaxpDIqC2A',
    role: 'Senior Product Designer',
    bio: 'Designing intuitive human experiences. Coffee lover & cyclist ☕🚴',
    isOnline: true,
    isTyping: true,
    lastMessage: 'Hey, are you coming today?',
    lastMessageTime: '10:32 PM',
    unreadCount: 0,
    isGroup: false,
    isVerified: true,
    isPinned: true,
    type: 'direct',
  },
  {
    id: 'conv-sarah',
    name: 'Sarah Chen',
    handle: '@sarahc',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBBvtzYZndijwawfKnGBpB3TyVS0HRUcU7WN6LFSEKKPUJvuVm2HM4HS_7u2J3kUjo0ibjKyTFokbEFDTNYlr8nsJe_1TYc_FA_yWXwlA3wp2NCcAiuN0O0mpXqLkjqkIAmM3nwih7IeuxvwyJWWnME0aI9DZowddLRaHnDJTx0zE5e-gJMbGB5Rcly4ezEBmkykqa0XAMprpubgyyYxgmY5YYl1zj7t52ZBpELcRZkbwRZy6A_smK3Kg',
    role: 'Principal Design System Lead',
    bio: 'Figma whisperer, token specialist, typography perfectionist.',
    isOnline: true,
    isTyping: false,
    lastMessage: 'Shared the Figma prototypes! Check out...',
    lastMessageTime: '9:45 PM',
    unreadCount: 2,
    isGroup: false,
    isVerified: true,
    type: 'direct',
  },
  {
    id: 'conv-eng-squad',
    name: 'Engineering Squad (8)',
    handle: '#eng-core',
    avatar: '',
    role: 'Engineering Channel',
    bio: 'Core architecture, release pipelines, and frontend stability.',
    isOnline: true,
    isTyping: false,
    lastMessage: 'David: PR #142 has been merged 🚀',
    lastMessageTime: '9:15 PM',
    unreadCount: 5,
    isGroup: true,
    memberCount: 8,
    members: ['David', 'Elena', 'Alex', 'Liam', 'Sarah', 'Maya', 'Jordan', 'Kai'],
    type: 'group',
  },
  {
    id: 'conv-liam',
    name: 'Liam Vance',
    handle: '@liamv',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAT0KKppi_egpUqGYQoDI5sSYd8_5NeJDLeRFDlMP8Q0ZYg6P2WaX3QXyidtwpbZ5pFYoiPjWO_9BDDjsvWc1ljwzVytCAE0fNOPW30AWSvORNncqQRxhCjZoO3UtqBLSJ_dM-QWVDmGRzgwLn72rH1HjAdxFgZTc-bNN7Kl7dOzIyyNJ1FmRgcycQS9Nf_NTkYpcXJDblIy1fcZP5tSNf-4wU41wQd877ttpsNj9wr-fJKzs1idM9O8g',
    role: 'Staff Frontend Engineer',
    bio: 'Building accessible, 60fps web apps. Rust & TypeScript devotee.',
    isOnline: false,
    isTyping: false,
    lastSeen: 'Yesterday',
    lastMessage: 'Let’s sync tomorrow morning at 10.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isGroup: false,
    type: 'direct',
  },
  {
    id: 'conv-elena',
    name: 'Elena Rostova',
    handle: '@elena',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCJVcoq4nr8S0nLvbkN_WOkD4J0WYrtgPrsET-NT8naOUCAoHAzZqQhJYaWLd6dTFQlRIr1JKoXPDjeX7JNbT27uilq3VhD3DZQ_eayIc2qpKHiuDCXPdp-xaSZu6eBvuGRissenWLIBTdWYmN2qDtNpIdz0fuAbX2yn07oitaD9uwRmvn1aw_T8sCSxj7G9EsBg_FUgcGwUlbk2j3apS7UQOvGvBzF41i3sjHPh2hg_rxMmq-xnl1ZxA',
    role: 'Senior User Researcher',
    bio: 'Translating qualitative human narratives into product leverage.',
    isOnline: true,
    isTyping: false,
    lastMessage: 'Audio message (0:42)',
    lastMessageTime: 'Oct 24',
    unreadCount: 0,
    isGroup: false,
    type: 'direct',
  },
  {
    id: 'conv-maya',
    name: 'Maya Lin',
    handle: '@mayalin',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHBxDJZwldW0-66FLJla_zs3r-0SkewzPWi0JeWQCODoGXWqTaJvz8Nc-Ochh-p4R1wKhOz7vguDEvGOP34PuazigoMhObd2n7YW0OVBCO55IfU6rd25lvVypd_exMWFkUDrIVB3g3C2_du9BdwcarkURrBOtD0DZ4LXB0FFnaTUvwc6lh_IkQl6CfazPP-hyJu1nZLtiI4dR-POTLa6XX_CRa-2TfwOF-GfGREGHR5mFyuC1-LmaZBQ',
    role: 'Lead iOS Architect',
    bio: 'SwiftUI, Metal rendering, haptics, and spatial computing.',
    isOnline: false,
    isTyping: false,
    lastSeen: 'Oct 23',
    lastMessage: 'Sent a photo',
    lastMessageTime: 'Oct 23',
    unreadCount: 0,
    isGroup: false,
    type: 'direct',
  },
];

export const INITIAL_MESSAGES_MAP: Record<string, Message[]> = {
  'conv-alex': [
    {
      id: 'msg-1',
      conversationId: 'conv-alex',
      senderId: 'conv-alex',
      senderName: 'Alex Morgan',
      senderAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD-TvN8uFvmqWAgkNxN3WJFvqNUA3LUfFBmY87kSDWjM8OxBEtw5rea71Xbdue1g8wlNXwUdZpqGCV3NDQ02H8LsOD64O-rO5aFuv_qPO04rrr0f6aoUK881AnPhBLIjMe-qeDSA8nqobzKAB7n90_Cx6HB35DXUvrwgWuUOn0TNor49FCnRrIdu2w2CYniT_GKfYKQXGW17ys1eFT6JQJxBsFvzwDZuhepokZrZi44toxNtqdPyhY8Zg',
      text: 'Hey! 👋 Did you review the ChitChat design specs?',
      timestamp: '10:30 PM',
      isMine: false,
      status: 'read',
      reactions: [],
    },
    {
      id: 'msg-2',
      conversationId: 'conv-alex',
      senderId: 'current_user',
      senderName: 'You',
      senderAvatar: CURRENT_USER.avatar,
      text: 'Yes! Just reviewed the 3-column desktop layout. The contrast and typography look immaculate!',
      timestamp: '10:31 PM',
      isMine: true,
      status: 'read',
      reactions: [{ emoji: '🔥', count: 1, users: ['Alex Morgan'] }],
    },
    {
      id: 'msg-3',
      conversationId: 'conv-alex',
      senderId: 'conv-alex',
      senderName: 'Alex Morgan',
      senderAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCN0e9yTGihlBqLuLDzp38-HKeICxHJPsqVsxJ9Ewu6f7_cqCFPVESylx6TeGL2BUaC5LjOoWGDlY05ruLRbFPGWvy_4jGE0d1dQbJQsjp-bySkTvd1KA1l6s4ixTtAqZUfQFv7RESySbNksoXRE52DuJveOQar0OvOzlvd4c5O9_5MIgqdNPBIGvXJ3U4eDxw800zuRGSOjkUhs56OZqKOM2D0C3FVS9XhisyEsX693YRj2b3wafARsw',
      text: 'Awesome! Here is the latest preview of the user profile sidebar.',
      timestamp: '10:31 PM',
      isMine: false,
      status: 'read',
      media: {
        type: 'image',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7mKLD_rhHmgrhJGSiSSGyfkMYql-Pn7CpIun-bDtKHtZRspsF33pXclPy9BQG0ib7Ns2WWzc4pli9CVE8Aky46mbXWuIyS2WDqUELibme_NF7fB8Y_CauXlbmrPIuDfgYCW4HhEnPxD0pJ_Ht6ErWsFtiS36wAmxf6KKwqqJnhByo-kpRIAo7ysSNvO3VyiKBt-veAgIlgqI5ihc9bDDBSSpuORFHqaLF9Otci7xBZ3Y2r6IzHM04FA',
        name: 'UserProfile_Sidebar_v2.png',
        size: '1.8 MB',
      },
      reactions: [],
    },
    {
      id: 'msg-4',
      conversationId: 'conv-alex',
      senderId: 'current_user',
      senderName: 'You',
      senderAvatar: CURRENT_USER.avatar,
      text: 'Hey, are you coming today?',
      timestamp: '10:32 PM',
      isMine: true,
      status: 'read',
      reactions: [],
    },
  ],
  'conv-sarah': [
    {
      id: 'msg-sarah-1',
      conversationId: 'conv-sarah',
      senderId: 'conv-sarah',
      senderName: 'Sarah Chen',
      senderAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBBvtzYZndijwawfKnGBpB3TyVS0HRUcU7WN6LFSEKKPUJvuVm2HM4HS_7u2J3kUjo0ibjKyTFokbEFDTNYlr8nsJe_1TYc_FA_yWXwlA3wp2NCcAiuN0O0mpXqLkjqkIAmM3nwih7IeuxvwyJWWnME0aI9DZowddLRaHnDJTx0zE5e-gJMbGB5Rcly4ezEBmkykqa0XAMprpubgyyYxgmY5YYl1zj7t52ZBpELcRZkbwRZy6A_smK3Kg',
      text: 'Hey there! Just finished tokenizing our brand colors for dark mode. Have a peek when you have a moment!',
      timestamp: '9:30 PM',
      isMine: false,
      status: 'read',
      reactions: [],
    },
    {
      id: 'msg-sarah-2',
      conversationId: 'conv-sarah',
      senderId: 'conv-sarah',
      senderName: 'Sarah Chen',
      senderAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBBvtzYZndijwawfKnGBpB3TyVS0HRUcU7WN6LFSEKKPUJvuVm2HM4HS_7u2J3kUjo0ibjKyTFokbEFDTNYlr8nsJe_1TYc_FA_yWXwlA3wp2NCcAiuN0O0mpXqLkjqkIAmM3nwih7IeuxvwyJWWnME0aI9DZowddLRaHnDJTx0zE5e-gJMbGB5Rcly4ezEBmkykqa0XAMprpubgyyYxgmY5YYl1zj7t52ZBpELcRZkbwRZy6A_smK3Kg',
      text: 'Shared the Figma prototypes! Check out the variable bindings for indigo and slate.',
      timestamp: '9:45 PM',
      isMine: false,
      status: 'read',
      reactions: [{ emoji: '👍', count: 1, users: ['You'] }],
    },
  ],
  'conv-eng-squad': [
    {
      id: 'msg-eng-1',
      conversationId: 'conv-eng-squad',
      senderId: 'user-elena',
      senderName: 'Elena Rostova',
      senderAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCJVcoq4nr8S0nLvbkN_WOkD4J0WYrtgPrsET-NT8naOUCAoHAzZqQhJYaWLd6dTFQlRIr1JKoXPDjeX7JNbT27uilq3VhD3DZQ_eayIc2qpKHiuDCXPdp-xaSZu6eBvuGRissenWLIBTdWYmN2qDtNpIdz0fuAbX2yn07oitaD9uwRmvn1aw_T8sCSxj7G9EsBg_FUgcGwUlbk2j3apS7UQOvGvBzF41i3sjHPh2hg_rxMmq-xnl1ZxA',
      text: 'All automated visual regression tests passed on the 3-column viewport!',
      timestamp: '9:05 PM',
      isMine: false,
      status: 'read',
      reactions: [{ emoji: '🔥', count: 3, users: ['David', 'Alex', 'Sarah'] }],
    },
    {
      id: 'msg-eng-2',
      conversationId: 'conv-eng-squad',
      senderId: 'user-david',
      senderName: 'David',
      senderAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAT0KKppi_egpUqGYQoDI5sSYd8_5NeJDLeRFDlMP8Q0ZYg6P2WaX3QXyidtwpbZ5pFYoiPjWO_9BDDjsvWc1ljwzVytCAE0fNOPW30AWSvORNncqQRxhCjZoO3UtqBLSJ_dM-QWVDmGRzgwLn72rH1HjAdxFgZTc-bNN7Kl7dOzIyyNJ1FmRgcycQS9Nf_NTkYpcXJDblIy1fcZP5tSNf-4wU41wQd877ttpsNj9wr-fJKzs1idM9O8g',
      text: 'David: PR #142 has been merged 🚀',
      timestamp: '9:15 PM',
      isMine: false,
      status: 'read',
      reactions: [{ emoji: '🚀', count: 4, users: ['Elena', 'Alex', 'Liam', 'Sarah'] }],
    },
  ],
  'conv-liam': [
    {
      id: 'msg-liam-1',
      conversationId: 'conv-liam',
      senderId: 'conv-liam',
      senderName: 'Liam Vance',
      senderAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAT0KKppi_egpUqGYQoDI5sSYd8_5NeJDLeRFDlMP8Q0ZYg6P2WaX3QXyidtwpbZ5pFYoiPjWO_9BDDjsvWc1ljwzVytCAE0fNOPW30AWSvORNncqQRxhCjZoO3UtqBLSJ_dM-QWVDmGRzgwLn72rH1HjAdxFgZTc-bNN7Kl7dOzIyyNJ1FmRgcycQS9Nf_NTkYpcXJDblIy1fcZP5tSNf-4wU41wQd877ttpsNj9wr-fJKzs1idM9O8g',
      text: 'Let’s sync tomorrow morning at 10. I can show the WebSocket reconnection logic.',
      timestamp: 'Yesterday',
      isMine: false,
      status: 'read',
      reactions: [],
    },
  ],
  'conv-elena': [
    {
      id: 'msg-elena-1',
      conversationId: 'conv-elena',
      senderId: 'conv-elena',
      senderName: 'Elena Rostova',
      senderAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCJVcoq4nr8S0nLvbkN_WOkD4J0WYrtgPrsET-NT8naOUCAoHAzZqQhJYaWLd6dTFQlRIr1JKoXPDjeX7JNbT27uilq3VhD3DZQ_eayIc2qpKHiuDCXPdp-xaSZu6eBvuGRissenWLIBTdWYmN2qDtNpIdz0fuAbX2yn07oitaD9uwRmvn1aw_T8sCSxj7G9EsBg_FUgcGwUlbk2j3apS7UQOvGvBzF41i3sjHPh2hg_rxMmq-xnl1ZxA',
      text: 'Sharing summary from participant interview #6. Listen to the quote snippet when free:',
      timestamp: 'Oct 24',
      isMine: false,
      status: 'read',
      media: {
        type: 'audio',
        url: '',
        name: 'Audio message (0:42)',
        size: '640 KB',
        duration: '0:42',
      },
      reactions: [],
    },
  ],
  'conv-maya': [
    {
      id: 'msg-maya-1',
      conversationId: 'conv-maya',
      senderId: 'conv-maya',
      senderName: 'Maya Lin',
      senderAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCHBxDJZwldW0-66FLJla_zs3r-0SkewzPWi0JeWQCODoGXWqTaJvz8Nc-Ochh-p4R1wKhOz7vguDEvGOP34PuazigoMhObd2n7YW0OVBCO55IfU6rd25lvVypd_exMWFkUDrIVB3g3C2_du9BdwcarkURrBOtD0DZ4LXB0FFnaTUvwc6lh_IkQl6CfazPP-hyJu1nZLtiI4dR-POTLa6XX_CRa-2TfwOF-GfGREGHR5mFyuC1-LmaZBQ',
      text: 'Sent a photo from our design review on the device test lab:',
      timestamp: 'Oct 23',
      isMine: false,
      status: 'read',
      media: {
        type: 'image',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx-nMghNlmCfwW-WXKDWwzeoIscyumDTTtJM1CAsE0QAGuSfDbAsCTcXMhP5U5-TWHFDNXxCYYQjfCP2-dTyyRWRd0iCQOqyH9Bey7rj5V37vUA_XYkuN5bW-4KHGTF2vJv2rlB3-2d6tKnv8PMKOlCOds7Oq_yjWcm6xhs91iPezVXxdAAjvhEui4ONak5QRG0PT1mWrz3ppjn4atXXbldx4WRjolTPTUu-pyMxBOOCl8IAWnxp01Dg',
        name: 'Device_Lab_Review.png',
        size: '2.1 MB',
      },
      reactions: [],
    },
  ],
};

export const SHARED_MEDIA_ITEMS: SharedMediaItem[] = [
  {
    id: 'media-1',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx-nMghNlmCfwW-WXKDWwzeoIscyumDTTtJM1CAsE0QAGuSfDbAsCTcXMhP5U5-TWHFDNXxCYYQjfCP2-dTyyRWRd0iCQOqyH9Bey7rj5V37vUA_XYkuN5bW-4KHGTF2vJv2rlB3-2d6tKnv8PMKOlCOds7Oq_yjWcm6xhs91iPezVXxdAAjvhEui4ONak5QRG0PT1mWrz3ppjn4atXXbldx4WRjolTPTUu-pyMxBOOCl8IAWnxp01Dg',
    title: 'UI screen mockups showing design wireframe charts and analytics in purple theme',
    date: 'Oct 25',
  },
  {
    id: 'media-2',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq6BdyBwilO9sIb4_hYVA6fjXl1byIoDfK6-T3NpwnEqcWYFDxv8mV5WYLh-6c8x9Hx8NCCXGNqK-MjKcaEDiZpmUbe_vfB1OpFyyhwpI23xN1towIcW3JkWVt804V_ysFe-lsLP-Bktc5BSO6M8iRdDK4b1lChFRVsJqFj9wXyXgtLrwA5YRBfHqP8HRqAPL6GkKtorIY1i9AA_02zRUkd4DvDIBJvoD5CNhMYdUfKOCUZpqdai1A3A',
    title: 'Minimalist architectural photo taken during design team offsite in Kyoto',
    date: 'Oct 23',
  },
  {
    id: 'media-3',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDielA6VcTHzIrckzm2M-QlSs-6b9ZfCzrknqYR5JIRnt4JEh_uqJ5yW2rd94nr3i3GCjEFYcE-H3G3aK06VVxm0K4b2Vb1WPrD9rhLd2fVxmJRojhmy4RQ4wVJZQEbrmzBKdq7ZSaGYtMdMCylltXHT9lMEmnL3MO_MwHXYJHyvDyLlnlU-f4F_TcoGwn03v4fZE48kmyhSv1QTA46phkE7_fsc6YDQ8A0YjIBe7GekOGMWe1W598lMw',
    title: 'Macro photo of artisan latte art coffee mug on wooden designer desk',
    date: 'Oct 21',
  },
  {
    id: 'media-4',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1zr7XA4llQHjxInFBCKISaMZddQ_1gLIfXnIYzCmdzPcXTiCUfKnFMs8gMQu-AoEUZw9JD8RhpwngJS55J5pticHC_0qKYHoO0c3-MpEon3tJdSyReNYufyySBcoyCx-Rxq3TJt_f3iN7uGGYhFBV5j5o9yjDepT1jPe4HtO6vkK8vbXzr0E0BPZgPQyxsEZAz7Yu8d-ujG6nQV0PpK9XUnptbqeTzhkheJJiM37GpUkTsj8LzTzEEg',
    title: 'Abstract 3D digital gradient mesh composition in violet and mint green brand colors',
    date: 'Oct 19',
  },
];

export const SHARED_FILES_ITEMS: SharedFileItem[] = [
  {
    id: 'file-1',
    name: 'ChitChat_Design_Tokens.pdf',
    size: '2.4 MB',
    date: 'Yesterday',
    type: 'pdf',
  },
  {
    id: 'file-2',
    name: 'Sprint_Brief_Q4.docx',
    size: '850 KB',
    date: 'Oct 22',
    type: 'doc',
  },
];

export const COMMON_GROUPS_ITEMS: CommonGroupItem[] = [
  {
    id: 'group-1',
    initials: 'DS',
    name: 'Design Systems Guild',
    membersCount: 24,
    colorClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  },
  {
    id: 'group-2',
    initials: 'FE',
    name: 'Frontend Core',
    membersCount: 16,
    colorClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
  },
];

export const INITIAL_SETTINGS: AppSettings = {
  theme: 'light',
  accent: 'indigo',
  textSize: 14,
  enterKeySends: true,
  notifications: {
    messages: true,
    sounds: true,
    desktopPush: true,
    previewSnippet: false,
    quietHours: true,
  },
  mediaAutoDownload: {
    photos: true,
    videos: false,
    docs: true,
  },
  twoFactorEnabled: true,
  displayName: 'Taylor Swift',
  username: 'taylor',
  bio: 'Product Designer & UI enthusiast · Crafting pixel-sharp interaction paradigms',
  email: 'taylor@chitchat.io',
};
