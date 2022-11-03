// interface는 Typescript의 문법으로 런타임 시, 날아가게 되지만,
// class는 런타임 이후에도 남아있게 되므로, 보다 나은 디버깅이 가능하게 됨.

export class JoinRequestDto {
  public email: string;

  public nickname: string;

  public password: string;
}
