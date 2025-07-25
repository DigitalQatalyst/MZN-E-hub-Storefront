"use client";

import { useState, useRef } from "react";
import Box from "@component/Box";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import NextImage from "@component/NextImage";
import StyledProductCategory from "./styled";
import Brand from "@models/Brand.model";
import Product from "@models/product.model";
import "./SMEStyles.css";

type Props = { carList: Product[]; carBrands: Brand[] };

interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
}

interface Discussion {
  id: string;
  author: string;
  time: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  files?: File[];
  commentsList?: Comment[];
}

export default function Section6({ carList, carBrands }: Props) {
  const [selected, setSelected] = useState("discussions");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>('Quality Content');
  const [postContent, setPostContent] = useState("");
  const [sidebarSelected, setSidebarSelected] = useState("my-communities");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Comment modal state
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPostForComment, setSelectedPostForComment] = useState<string>("");
  const [commentText, setCommentText] = useState("");

  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: "1",
      author: "Layla Hassan",
      time: "Jul 28 • 14:00",
      title: "Successfully Secured Khalifa Fund Support for My Startup!",
      content: "I'm excited to announce that my startup was just approved for funding by the Khalifa Fund! 🎉 The process was incredibly thorough, but now I'm ready to expand. If anyone else has been through this, I'd love to hear about your experience and any tips for successfully navigating the next steps!",
      category: "Funding & Finance",
      likes: 21,
      comments: 3,
      shares: 2,
      views: 999,
      files: [],
      commentsList: []
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');

  // File upload handlers
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const validFiles = fileArray.filter(file => {
        const isValidType = file.type.startsWith('image/') ||
          file.type === 'application/pdf' ||
          file.type.startsWith('video/');
        const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
        return isValidType && isValidSize;
      });

      setSelectedFiles(prev => [...prev, ...validFiles]);
    }
    event.target.value = '';
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Guidelines expansion handler
  const toggleGuidelinesSection = (sectionName: string) => {
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  // Post creation handler
  const handleCreatePost = () => {
    if (postContent.trim() || selectedFiles.length > 0) {
      const newPost: Discussion = {
        id: Date.now().toString(),
        author: "Current User",
        time: "now",
        title: postContent.trim() || "File attachment post",
        content: postContent.trim(),
        category: "",
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        files: [...selectedFiles],
        commentsList: []
      };

      setDiscussions([newPost, ...discussions]);
      setPostContent("");
      setSelectedFiles([]);
    }
  };

  // Keyboard handler for post creation
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCreatePost();
    }
  };

  // Like post handler
  const handleLikePost = (postId: string) => {
    setDiscussions(prevDiscussions =>
      prevDiscussions.map(discussion =>
        discussion.id === postId
          ? { ...discussion, likes: discussion.likes + 1 }
          : discussion
      )
    );
  };

  // Share post handler
  const handleSharePost = (postId: string) => {
    const post = discussions.find(d => d.id === postId);
    if (!post) return;

    const shareText = `${post.title}\n\n${post.content}\n\nShared from: ${window.location.href}`;

    if (navigator.share) {
      navigator.share({
        title: post.title || 'Community Post',
        text: post.content || post.title,
        url: window.location.href
      }).catch(() => {
        // Fallback to clipboard if native sharing fails
        navigator.clipboard.writeText(shareText).then(() => {
          alert('Post content copied to clipboard!');
        });
      });
    } else {
      // Fallback for browsers without native sharing
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Post content copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy to clipboard');
      });
    }
    
    // Increment share count
    setDiscussions(prevDiscussions =>
      prevDiscussions.map(discussion =>
        discussion.id === postId
          ? { ...discussion, shares: discussion.shares + 1 }
          : discussion
      )
    );
  };

  // View post handler (increments when content is clicked)
  const handleViewPost = (postId: string) => {
    setDiscussions(prevDiscussions =>
      prevDiscussions.map(discussion =>
        discussion.id === postId
          ? { ...discussion, views: discussion.views + 1 }
          : discussion
      )
    );
  };

  // Comment submission handler
  const handleSubmitComment = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: "Current User",
        text: commentText.trim(),
        time: "now"
      };

      setDiscussions(prevDiscussions =>
        prevDiscussions.map(discussion =>
          discussion.id === selectedPostForComment
            ? { 
                ...discussion, 
                comments: discussion.comments + 1,
                commentsList: [...(discussion.commentsList || []), newComment]
              }
            : discussion
        )
      );
      
      // Reset modal state
      setCommentText("");
      setShowCommentModal(false);
      setSelectedPostForComment("");
    }
  };

  // Open comment modal
  const handleMessageAuthor = (authorName: string, postId: string) => {
    setSelectedPostForComment(postId);
    setShowCommentModal(true);
  };

  // Comment Modal Component
  const CommentModal = () => (
    <Box 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: showCommentModal ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={() => setShowCommentModal(false)}
    >
      <Box 
        className="comment-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <Box className="comment-modal-header">
          <h3>Add Comment</h3>
          <button 
            className="close-modal-btn"
            onClick={() => setShowCommentModal(false)}
          >
            ×
          </button>
        </Box>
        
        <Box className="comment-modal-body">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment..."
            className="comment-textarea"
            autoFocus
          />
        </Box>
        
        <Box className="comment-modal-footer">
          <button 
            className="cancel-comment-btn"
            onClick={() => setShowCommentModal(false)}
          >
            Cancel
          </button>
          <button 
            className="submit-comment-btn"
            onClick={handleSubmitComment}
            disabled={!commentText.trim()}
          >
            Post Comment
          </button>
        </Box>
      </Box>
    </Box>
  );

  // Static data
  const groups = [
    { id: "esg-compliance", name: "ESG Compliance Help" },
    { id: "carbon-credit", name: "Carbon Credit Conversations" },
    { id: "local-supply-chains", name: "Local Supply Chains" },
    { id: "funding-grants", name: "Funding & Grants" },
    { id: "esg-policy-exchange", name: "ESG Policy Exchange" },
    { id: "green-energy-solutions", name: "Green Energy Solutions" },
  ];

  const guidelines = [
    {
      title: 'Respectful Communication',
      content: [
        'Treat all members with respect and courtesy',
        'Use professional language and avoid offensive content',
        'Listen actively and respond thoughtfully to others',
        'Avoid personal attacks or discriminatory language'
      ]
    },
    {
      title: 'Quality Content',
      content: [
        'Share accurate information from reliable sources',
        'Provide valuable insights and meaningful contributions',
        'Respect intellectual property and cite sources appropriately',
        'Keep content relevant to the community\'s focus area'
      ]
    },
    {
      title: 'Privacy & Confidentiality',
      content: [
        'Respect the privacy of other members',
        'Do not share personal information without permission',
        'Keep confidential business information secure',
        'Report any privacy concerns to community moderators'
      ]
    },
    {
      title: 'Intellectual Property',
      content: [
        'Respect copyrights and trademarks',
        'Give proper attribution when sharing content',
        'Do not plagiarize or copy others\' work',
        'Seek permission before sharing proprietary information'
      ]
    },
    {
      title: 'Commercial Activity',
      content: [
        'Avoid excessive self-promotion or spam',
        'Focus on value-driven content over sales pitches',
        'Disclose any commercial interests or affiliations',
        'Respect community guidelines about promotional content'
      ]
    }
  ];

  const members = [
    {
      id: 1,
      name: 'Karim Abdullah',
      role: 'admin',
      avatar: '/images/image 1.jpg'
    },
    {
      id: 2,
      name: 'Layla Hassan',
      role: 'moderator',
      avatar: '/images/image 2.jpg'
    },
    {
      id: 3,
      name: 'Omar Al-Farouk',
      role: 'moderator',
      avatar: '/images/image 3.jpg'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      role: 'member',
      avatar: '/images/image 2.jpg'
    },
    {
      id: 5,
      name: 'Ahmed Ali',
      role: 'member',
      avatar: '/images/image 1.jpg'
    }
  ];

  const handleCategoryClick = (brand: Brand) => () => {
    if (selected === brand.slug) setSelected("");
    else setSelected(brand.slug);
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container mb="80px">
      <CommentModal />
      <FlexBox>
        {/* Sidebar */}
        <Hidden down={768} mr="1.75rem">
          <Box padding="1.25rem" bg="white" minWidth="280px" borderRight="1px solid var(--Gray-20, #E2E8F0)">
            {/* Home Section */}
            <StyledProductCategory>
              <Box
                display="flex"
                alignItems="center"
                padding="12px"
                borderRadius="8px"
                width="100%"
                maxWidth="280px"
                style={{
                  cursor: 'pointer',
                  background: sidebarSelected === "home" ? '#0061F2' : 'transparent',
                  color: sidebarSelected === "home" ? 'white' : '#6C757D'
                }}
                onClick={() => setSidebarSelected("home")}
              >
                <Box width={24} height={24} marginRight={2} display="flex" justifyContent="center" alignItems="center">
                  <NextImage
                    src="/images/home.svg"
                    alt="home"
                    width={20}
                    height={20}
                  />
                </Box>
                <span style={{ fontSize: '14px', fontWeight: sidebarSelected === "home" ? 600 : 400 }}>Home</span>
              </Box>
            </StyledProductCategory>

            {/* Explore Section */}
            <StyledProductCategory>
              <Box
                display="flex"
                alignItems="center"
                padding="12px"
                borderRadius="8px"
                width="100%"
                maxWidth="280px"
                style={{
                  cursor: 'pointer',
                  background: sidebarSelected === "explore" ? '#0061F2' : 'transparent',
                  color: sidebarSelected === "explore" ? 'white' : '#6C757D'
                }}
                onClick={() => setSidebarSelected("explore")}
              >
                <Box width={24} height={24} marginRight={2} display="flex" justifyContent="center" alignItems="center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <mask id="mask0_7497_78301" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_7497_78301)">
                      <path
                        d="M7.80039 16.1984L14.4004 14.3984L16.2004 7.79844L9.60039 9.59844L7.80039 16.1984ZM12.0004 13.1984C11.6671 13.2151 11.3837 13.1044 11.1504 12.8662C10.9171 12.628 10.8004 12.3388 10.8004 11.9984C10.8004 11.6651 10.9171 11.3818 11.1504 11.1484C11.3837 10.9151 11.6671 10.7984 12.0004 10.7984C12.3337 10.7984 12.6171 10.9151 12.8504 11.1484C13.0837 11.3818 13.2004 11.6651 13.2004 11.9984C13.2004 12.3318 13.0837 12.6151 12.8504 12.8484C12.6171 13.0818 12.3337 13.1984 12.0004 13.1984ZM12.0074 21.5984C10.6861 21.5984 9.44206 21.3484 8.27539 20.8484C7.10872 20.3484 6.08789 19.6609 5.21289 18.7859C4.33789 17.9109 3.65039 16.8904 3.15039 15.7244C2.65039 14.5584 2.40039 13.3126 2.40039 11.9869C2.40039 10.6613 2.65039 9.41927 3.15039 8.26094C3.65039 7.1026 4.33789 6.08594 5.21289 5.21094C6.08789 4.33594 7.10839 3.64844 8.27439 3.14844C9.44039 2.64844 10.6862 2.39844 12.0119 2.39844C13.3376 2.39844 14.5796 2.64844 15.7379 3.14844C16.8962 3.64844 17.9129 4.33594 18.7879 5.21094C19.6629 6.08594 20.3504 7.10444 20.8504 8.26644C21.3504 9.4286 21.6004 10.6703 21.6004 11.9914C21.6004 13.3128 21.3504 14.5568 20.8504 15.7234C20.3504 16.8901 19.6629 17.9109 18.7879 18.7859C17.9129 19.6609 16.8944 20.3484 15.7324 20.8484C14.5702 21.3484 13.3286 21.5984 12.0074 21.5984Z"
                        fill={sidebarSelected === "explore" ? "white" : "#6C757D"}
                      />
                    </g>
                  </svg>
                </Box>
                <span style={{ fontSize: '14px', fontWeight: sidebarSelected === "explore" ? 600 : 400 }}>Explore</span>
              </Box>
            </StyledProductCategory>

            {/* My Communities Section */}
            <StyledProductCategory>
              <Box
                display="flex"
                alignItems="center"
                padding="12px"
                borderRadius="8px"
                width="100%"
                maxWidth="280px"
                style={{
                  cursor: 'pointer',
                  background: sidebarSelected === "my-communities" ? '#0061F2' : 'transparent',
                  color: sidebarSelected === "my-communities" ? 'white' : '#6C757D'
                }}
                onClick={() => setSidebarSelected("my-communities")}
              >
                <Box width={24} height={24} marginRight={2} display="flex" justifyContent="center" alignItems="center">
                  <NextImage
                    src="/images/groups_2.svg"
                    alt="communities"
                    width={20}
                    height={20}
                  />
                </Box>
                <span style={{ fontSize: '14px', fontWeight: sidebarSelected === "my-communities" ? 600 : 400 }}>My Communities</span>
              </Box>
            </StyledProductCategory>

            {/* Notifications Section */}
            <StyledProductCategory>
              <Box
                display="flex"
                alignItems="center"
                padding="12px"
                borderRadius="8px"
                width="100%"
                maxWidth="280px"
                style={{
                  cursor: 'pointer',
                  background: sidebarSelected === "notifications" ? '#0061F2' : 'transparent',
                  color: sidebarSelected === "notifications" ? 'white' : '#6C757D'
                }}
                onClick={() => setSidebarSelected("notifications")}
              >
                <Box width={24} height={24} marginRight={2} display="flex" justifyContent="center" alignItems="center">
                  <NextImage
                    src="/images/notifications_unread.svg"
                    alt="notifications"
                    width={20}
                    height={20}
                  />
                </Box>
                <span style={{ fontSize: '14px', fontWeight: sidebarSelected === "notifications" ? 600 : 400 }}>Notifications</span>
              </Box>
            </StyledProductCategory>

            {/* Messages Section */}
            <StyledProductCategory>
              <Box
                display="flex"
                alignItems="center"
                padding="12px"
                borderRadius="8px"
                width="100%"
                maxWidth="280px"
                style={{
                  cursor: 'pointer',
                  background: sidebarSelected === "messages" ? '#0061F2' : 'transparent',
                  color: sidebarSelected === "messages" ? 'white' : '#6C757D'
                }}
                onClick={() => setSidebarSelected("messages")}
              >
                <Box width={24} height={24} marginRight={2} display="flex" justifyContent="center" alignItems="center">
                  <NextImage
                    src="/images/inbox.svg"
                    alt="messaging"
                    width={20}
                    height={20}
                  />
                </Box>
                <span style={{ fontSize: '14px', fontWeight: sidebarSelected === "messages" ? 600 : 400 }}>Messages</span>
              </Box>
            </StyledProductCategory>
          </Box>
        </Hidden>

        <Box flex="1">
          {sidebarSelected === "my-communities" && (
            <>
              {/* Community Header */}
              <Box className="community-header">
                <Box className="community-banner">
                  <NextImage
                    src="/images/community-banner.svg"
                    alt="Female Founders in Fintech"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>

                <Box className="community-description">
                  <p>A hub for women revolutionizing the financial services industry through fintech solutions, offering insights into investment strategies and tech-driven financial models.</p>
                  <button className="join-community-btn">Join Community</button>
                </Box>
              </Box>

              {/* Navigation Tabs */}
              <Box className="nav-tabs">
                <Box
                  className={`nav-tab ${selected === "discussions" ? "active" : ""}`}
                  onClick={() => setSelected("discussions")}
                >
                  Discussions
                </Box>
                <Box
                  className={`nav-tab ${selected === "about" ? "active" : ""}`}
                  onClick={() => setSelected("about")}
                >
                  About
                </Box>
                <Box
                  className={`nav-tab ${selected === "members" ? "active" : ""}`}
                  onClick={() => setSelected("members")}
                >
                  Members
                </Box>
              </Box>

              {/* Content Area */}
              {selected === "discussions" && (
                <Box className="discussions-content">
                  {/* Post Input */}
                  <Box className="post-input-container">
                    <textarea
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Start a discussion in this community"
                      className="post-textarea"
                    />
                    
                    {/* File Preview - Shows selected files before posting */}
                    {selectedFiles.length > 0 && (
                      <Box className="file-preview-container">
                        {selectedFiles.map((file, index) => (
                          <Box key={index} className="file-preview-item">
                            <FlexBox alignItems="center" justifyContent="space-between">
                              <FlexBox alignItems="center">
                                <Box className="file-icon">
                                  {file.type.startsWith('image/') ? '🖼️' :
                                    file.type.startsWith('video/') ? '🎥' : '📄'}
                                </Box>
                                <Box className="file-info">
                                  <span className="file-name">{file.name}</span>
                                  <span className="file-size">{formatFileSize(file.size)}</span>
                                </Box>
                              </FlexBox>
                              <button
                                className="remove-file-btn"
                                onClick={() => removeFile(index)}
                              >
                                ×
                              </button>
                            </FlexBox>
                          </Box>
                        ))}
                      </Box>
                    )}
                    
                    <FlexBox className="post-actions">
                      <FlexBox className="post-tools">
                        <button className="post-tool" onClick={handleFileUpload}>
                          <NextImage src="/images/Group.svg" alt="image" width={16} height={16} />
                        </button>
                        <button className="post-tool">
                          <NextImage src="/images/Group (1).svg" alt="video" width={16} height={16} />
                        </button>
                        <button className="post-tool">
                          <NextImage src="/images/Group (2).svg" alt="attachment" width={16} height={16} />
                        </button>
                      </FlexBox>
                      <button
                        className="post-submit-btn"
                        onClick={handleCreatePost}
                        disabled={!postContent.trim() && selectedFiles.length === 0}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                          <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="#6c757d" />
                        </svg>
                      </button>
                    </FlexBox>
                    
                    {/* Hidden File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,video/*,.pdf"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </Box>

                  {/* Discussion Posts */}
                  {discussions.map((discussion) => (
                    <Box key={discussion.id} className="discussion-post">
                      <FlexBox className="post-header">
                        <FlexBox alignItems="center">
                          <Box className="post-avatar">
                            <NextImage src="/images/32px.jpg" alt="avatar" width={40} height={40} />
                          </Box>
                          <Box>
                            <h4 className="post-author">{discussion.author}</h4>
                            <span className="post-time">{discussion.time}</span>
                          </Box>
                        </FlexBox>
                      </FlexBox>

                      <Box className="post-content" onClick={() => handleViewPost(discussion.id)} style={{ cursor: 'pointer' }}>
                        <h3 className="post-title">{discussion.title}</h3>
                        <p className="post-description">{discussion.content}</p>
                        
                        {/* Display uploaded files in posts */}
                        {discussion.files && discussion.files.length > 0 && (
                          <Box className="post-files">
                            {discussion.files.map((file, index) => (
                              <Box key={index} className="post-file-item">
                                <span className="file-icon">
                                  {file.type.startsWith('image/') ? '🖼️' :
                                    file.type.startsWith('video/') ? '🎥' : '📄'}
                                </span>
                                <span className="file-name">{file.name}</span>
                              </Box>
                            ))}
                          </Box>
                        )}
                        
                        {discussion.category && (
                          <Box className="post-category">
                            <span className="category-tag">{discussion.category}</span>
                          </Box>
                        )}
                      </Box>

                      <FlexBox className="post-engagement">
                        <FlexBox className="engagement-actions">
                          <span className="engagement-item" onClick={() => handleLikePost(discussion.id)} style={{ cursor: 'pointer' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M5.83464 8.33464V18.3346M12.5013 4.9013L11.668 8.33464H16.5263C16.785 8.33464 17.0402 8.39488 17.2717 8.51059C17.5031 8.6263 17.7044 8.79431 17.8596 9.0013C18.0149 9.2083 18.1198 9.44859 18.1661 9.70316C18.2124 9.95773 18.1987 10.2196 18.1263 10.468L16.1846 17.1346C16.0837 17.4808 15.8731 17.7849 15.5846 18.0013C15.2961 18.2177 14.9453 18.3346 14.5846 18.3346H3.33464C2.89261 18.3346 2.46868 18.159 2.15612 17.8465C1.84356 17.5339 1.66797 17.11 1.66797 16.668V10.0013C1.66797 9.55927 1.84356 9.13535 2.15612 8.82279C2.46868 8.51023 2.89261 8.33464 3.33464 8.33464H5.63464C5.94471 8.33447 6.24858 8.24781 6.5121 8.0844C6.77561 7.92099 6.98832 7.68731 7.1263 7.40964L10.0013 1.66797C10.3943 1.67284 10.7811 1.76644 11.1328 1.9418C11.4845 2.11715 11.7921 2.36972 12.0325 2.68064C12.2729 2.99155 12.4399 3.35277 12.5211 3.7373C12.6023 4.12184 12.5955 4.51975 12.5013 4.9013Z" stroke="#818C99" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {discussion.likes}
                          </span>
                          
                          <span className="engagement-item" onClick={() => handleMessageAuthor(discussion.author, discussion.id)} style={{ cursor: 'pointer' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <g opacity="0.7" clipPath="url(#clip0_7497_78400)">
                                <path d="M6.53302 18.7763C6.34291 18.6221 6.1891 18.4279 6.08252 18.2076C5.97594 17.9872 5.91921 17.7461 5.91636 17.5013V15.7513H4.58302C4.20654 15.7679 3.83073 15.7059 3.47948 15.5694C3.12823 15.4328 2.80924 15.2247 2.54276 14.9582C2.27629 14.6918 2.06817 14.3728 1.93164 14.0215C1.79511 13.6703 1.73314 13.2945 1.74969 12.918V5.41798C1.73314 5.0415 1.79511 4.66569 1.93164 4.31444C2.06817 3.9632 2.27629 3.6442 2.54276 3.37772C2.80924 3.11125 3.12823 2.90313 3.47948 2.7666C3.83073 2.63007 4.20654 2.5681 4.58302 2.58465H15.4164C15.7928 2.5681 16.1687 2.63007 16.5199 2.7666C16.8711 2.90313 17.1901 3.11125 17.4566 3.37772C17.7231 3.6442 17.9312 3.9632 18.0677 4.31444C18.2043 4.66569 18.2662 5.0415 18.2497 5.41798V12.918C18.2662 13.2945 18.2043 13.6703 18.0677 14.0215C17.9312 14.3728 17.7231 14.6918 17.4566 14.9582C17.1901 15.2247 16.8711 15.4328 16.5199 15.5694C16.1687 15.7059 15.7928 15.7679 15.4164 15.7513H11.533L8.43302 18.468C8.21458 18.7509 7.89673 18.9401 7.54392 18.9974C7.19111 19.0547 6.82973 18.9756 6.53302 18.7763ZM10.6414 14.5347C10.8532 14.3478 11.1256 14.2442 11.408 14.243H15.4164C15.5956 14.2597 15.7764 14.2367 15.9457 14.1756C16.1151 14.1145 16.2689 14.0168 16.3962 13.8895C16.5235 13.7622 16.6212 13.6084 16.6823 13.439C16.7434 13.2697 16.7664 13.0889 16.7497 12.9097V5.40965C16.7664 5.23039 16.7434 5.04965 16.6823 4.8803C16.6212 4.71094 16.5235 4.55714 16.3962 4.42983C16.2689 4.30253 16.1151 4.20485 15.9457 4.14374C15.7764 4.08264 15.5956 4.05962 15.4164 4.07632H4.58302C4.40299 4.05943 4.22146 4.0826 4.05144 4.14418C3.88143 4.20575 3.72716 4.3042 3.5997 4.43246C3.47224 4.56072 3.37475 4.7156 3.31424 4.88599C3.25372 5.05639 3.23168 5.23806 3.24969 5.41798V12.918C3.23299 13.0972 3.25601 13.278 3.31712 13.4473C3.37822 13.6167 3.4759 13.7705 3.6032 13.8978C3.73051 14.0251 3.88431 14.1228 4.05367 14.1839C4.22302 14.245 4.40376 14.268 4.58302 14.2513H6.66636C7.24969 14.418 7.24969 14.418 7.41636 15.0013V17.3597L10.6414 14.5347Z" fill="#818C99" />
                              </g>
                              <defs>
                                <clipPath id="clip0_7497_78400">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                            {discussion.comments}
                          </span>
                          
                          <span className="engagement-item" onClick={() => handleSharePost(discussion.id)} style={{ cursor: 'pointer' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <g opacity="0.7" clipPath="url(#clip0_7497_78403)">
                                <path d="M10.0834 6.55766V3.66599C10.085 3.45717 10.146 3.25309 10.2592 3.07764C10.3725 2.90219 10.5333 2.7626 10.723 2.67519C10.9127 2.58779 11.1233 2.55618 11.3303 2.58407C11.5372 2.61195 11.732 2.69818 11.8918 2.83266L19.3418 9.16599C19.5638 9.35502 19.7017 9.62447 19.7251 9.91512C19.7485 10.2058 19.6556 10.4938 19.4668 10.716L19.3418 10.841L11.8918 17.1743C11.732 17.3088 11.5372 17.395 11.3303 17.4229C11.1233 17.4508 10.9127 17.4192 10.723 17.3318C10.5333 17.2444 10.3725 17.1048 10.2592 16.9293C10.146 16.7539 10.085 16.5498 10.0834 16.341V13.466C6.18342 13.5577 3.41676 14.3743 1.84176 15.8577C1.69097 15.9972 1.49931 16.0847 1.29505 16.107C1.09079 16.1294 0.884757 16.0855 0.707338 15.9819C0.529919 15.8782 0.390512 15.7203 0.309683 15.5314C0.228855 15.3425 0.210885 15.1326 0.258424 14.9327C1.53342 9.63266 4.85009 6.79933 10.0834 6.55766ZM11.5834 4.54099V8.04099H10.8334C6.41676 8.04099 3.56676 9.91599 2.17509 13.7577C4.21676 12.5493 7.10842 11.9577 10.8334 11.9577H11.5834V15.4577L18.0084 9.99933L11.5834 4.54099Z" fill="#818C99" />
                              </g>
                              <defs>
                                <clipPath id="clip0_7497_78403">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                            {discussion.shares}
                          </span>
                        </FlexBox>
                        
                        <span className="post-views" style={{ cursor: 'pointer' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                            <g opacity="0.5" clipPath="url(#clip0_7497_78406)">
                              <path d="M7 10C2.8 10 0 6 0 5C0 4 2.8 0 7 0C11.2 0 14 4 14 5C14 6 11.2 10 7 10ZM7 8.5C8.9 8.5 10.5 6.9 10.5 5C10.5 3.1 8.9 1.5 7 1.5C5.1 1.5 3.5 3.1 3.5 5C3.5 6.9 5.1 8.5 7 8.5ZM7 6.6C6.1 6.6 5.4 5.9 5.4 5C5.4 4.1 6.1 3.4 7 3.4C7.9 3.4 8.6 4.1 8.6 5C8.6 5.9 7.9 6.6 7 6.6Z" fill="#818C99" />
                            </g>
                            <defs>
                              <clipPath id="clip0_7497_78406">
                                <rect width="14" height="10" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          {discussion.views}
                        </span>
                      </FlexBox>
                    </Box>
                  ))}
                </Box>
              )}

              {selected === "about" && (
                <Box className="about-content">
                  <Box className="about-info-container">
                    <h2>About this Community</h2>
                    <p>This community brings together female founders and leaders in the fintech space to share insights, opportunities, and support each other's growth in the financial technology sector. We foster entrepreneurs in fintech who connect, share insights, and collaborate on groundbreaking solutions that are transforming the financial sector industry. From payment systems to blockchain and digital lending, the space fosters discussions on trading, investment strategies, and technology-driven financial models. Join us to connect with like-minded leaders, share resources, and drive the future of financial innovation.</p>
                  </Box>
                  <Box className="community-guidelines">
                    <h3>Community Guidelines</h3>
                    <p>To ensure a productive and welcoming environment for all members, we ask everyone to follow these community guidelines:</p>

                    {guidelines.map((guideline, index) => (
                      <Box key={index} className="guideline-item">
                        <FlexBox
                          className="guideline-header"
                          onClick={() => toggleGuidelinesSection(guideline.title)}
                        >
                          <span className="guideline-title">{guideline.title}</span>
                          <span className="guideline-arrow">
                            {expandedSection === guideline.title ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <mask id="mask0_7497_78730" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                  <rect width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_7497_78730)">
                                  <path d="M11.9995 15.0398L6.3457 9.38578L7.39945 8.33203L11.9995 12.9168L16.5995 8.33203L17.6532 9.38578L11.9995 15.0398Z" fill="#1C1B1F" />
                                </g>
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ transform: 'rotate(-90deg)' }}>
                                <mask id="mask0_7497_78730" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                  <rect width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_7497_78730)">
                                  <path d="M11.9995 15.0398L6.3457 9.38578L7.39945 8.33203L11.9995 12.9168L16.5995 8.33203L17.6532 9.38578L11.9995 15.0398Z" fill="#1C1B1F" />
                                </g>
                              </svg>
                            )}
                          </span>
                        </FlexBox>
                        {expandedSection === guideline.title && guideline.content.length > 0 && (
                          <Box className="guideline-content">
                            {guideline.content.map((item, itemIndex) => (
                              <Box key={itemIndex} className="guideline-point">
                                • {item}
                              </Box>
                            ))}
                          </Box>
                        )}
                      </Box>
                    ))}

                    <p className="guidelines-footer">
                      By participating in this community, you agree to abide by these guidelines.{' '}
                      <span className="guidelines-link">
                        Violations may result in temporary or permanent removal from the group.
                      </span>
                    </p>
                  </Box>
                </Box>
              )}

              {selected === "members" && (
                <Box className="members-content">
                  <h2>Members</h2>
                  <p className="members-subtitle">View members in this community</p>

                  <Box className="members-search">
                    <input
                      type="text"
                      placeholder="Search members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                    {searchTerm && (
                      <button
                        className="search-clear"
                        onClick={() => setSearchTerm('')}
                      >
                        ×
                      </button>
                    )}
                  </Box>

                  <Box className="member-list">
                    {filteredMembers.length > 0 ? (
                      filteredMembers.map((member) => (
                        <Box key={member.id} className="member-item">
                          <Box className="member-info">
                            <Box className="member-avatar">
                              <NextImage
                                src={member.avatar}
                                alt={member.name}
                                width={40}
                                height={40}
                              />
                            </Box>
                            <h4 className="member-name">{member.name}</h4>
                          </Box>
                          <span className={`member-role ${member.role}`}>
                            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                          </span>
                        </Box>
                      ))
                    ) : (
                      <Box className="no-members-found">
                        <p>No members found matching "{searchTerm}"</p>
                      </Box>
                    )}
                  </Box>

                  <a href="#" className="join-community-link">
                    Join community to view all members
                  </a>
                </Box>
              )}
            </>
          )}

          {/* Coming Soon Pages */}
          {sidebarSelected === "home" && (
            <Box style={{
              padding: '80px 40px',
              textAlign: 'center',
              fontSize: '24px',
              color: '#6C757D',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              margin: '20px'
            }}>
              <h2 style={{ marginBottom: '16px', color: '#495057' }}>Home</h2>
              <p>Coming Soon</p>
            </Box>
          )}

          {sidebarSelected === "explore" && (
            <Box style={{
              padding: '80px 40px',
              textAlign: 'center',
              fontSize: '24px',
              color: '#6C757D',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              margin: '20px'
            }}>
              <h2 style={{ marginBottom: '16px', color: '#495057' }}>Explore</h2>
              <p>Coming Soon</p>
            </Box>
          )}

          {sidebarSelected === "notifications" && (
            <Box style={{
              padding: '80px 40px',
              textAlign: 'center',
              fontSize: '24px',
              color: '#6C757D',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              margin: '20px'
            }}>
              <h2 style={{ marginBottom: '16px', color: '#495057' }}>Notifications</h2>
              <p>Coming Soon</p>
            </Box>
          )}

          {sidebarSelected === "messages" && (
            <Box style={{
              padding: '80px 40px',
              textAlign: 'center',
              fontSize: '24px',
              color: '#6C757D',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              margin: '20px'
            }}>
              <h2 style={{ marginBottom: '16px', color: '#495057' }}>Messages</h2>
              <p>Coming Soon</p>
            </Box>
          )}
        </Box>
      </FlexBox>
    </Container>
  );
}