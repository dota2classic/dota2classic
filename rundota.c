#include <stdio.h>


int main(int argc, char **argv){
  
  char joinedPath[200] = "";
  for(int i = 1; i < argc - 1; i++){
    printf("%d - %s\n", i, argv[i]);
    sprintf(joinedPath, "%s %s", joinedPath, argv[i]);
  }


  char result[300];
  sprintf( result, "cd %s && %s", joinedPath, argv[argc - 1]);


  // printf("%s\n", result);
  system(result);
  return 0;
}