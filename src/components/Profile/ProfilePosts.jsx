import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
import useGetUsersPosts from "../../hooks/useGetUsersPosts";

const ProfilePosts = () => {
  const { isLoading, posts } = useGetUsersPosts();
  const noPostsFound = !isLoading && posts.length === 0;

  if (noPostsFound) return <NoPostsFound />;

  return (
    <Grid
      templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
      gap={1}
      columnGap={1}
    >
      {isLoading && (
        <>
          {[...Array(6)].map((_, idx) => (
            <VStack key={idx} alignItems={"flex-start"} gap={4}>
              <Skeleton w={"full"}>
                <Box h={"300px"}>contents wraped</Box>
              </Skeleton>
            </VStack>
          ))}
        </>
      )}
      {!isLoading && (
        <>
          {posts.map((post) => (
            <ProfilePost post={post} key={post.id} />
          ))}
        </>
      )}
    </Grid>
  );
};

export default ProfilePosts;

const NoPostsFound = () => {
  return ( 
    <Flex flexDir={"column"} textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}>No Posts Found</Text>
    </Flex>
  );
};
